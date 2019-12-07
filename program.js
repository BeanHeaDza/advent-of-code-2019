const fs = require("fs");
const { Observable, Subject, of } = require("rxjs");
const { take, map } = require("rxjs/operators");

const parseOpcode = instruction => {
  const s = "" + instruction;
  if (s.length <= 2) {
    return {
      code: instruction,
      parameterModes: ["ref", "ref", "ref"]
    };
  }

  parameterModes = s
    .substr(0, s.length - 2)
    .split("")
    .map(c => (c === "0" ? "ref" : "value"))
    .reverse();

  while (parameterModes.length < 3) {
    parameterModes.push("ref");
  }

  return {
    code: +s.substr(s.length - 2),
    parameterModes
  };
};

const getParam = (instructions, mode, currentIndex) => {
  if (currentIndex >= instructions.length) {
    return undefined;
  }

  return mode === "value" ? currentIndex : instructions[currentIndex];
};

async function run(instructions, input, output) {
  let currentIndex = 0;
  instructions = [...instructions];

  let opcode = parseOpcode(instructions[0]);

  while (opcode.code !== 99) {
    const a = getParam(
      instructions,
      opcode.parameterModes[0],
      currentIndex + 1
    );
    const b = getParam(
      instructions,
      opcode.parameterModes[1],
      currentIndex + 2
    );
    const c = getParam(
      instructions,
      opcode.parameterModes[2],
      currentIndex + 3
    );
    switch (opcode.code) {
      case 1:
        instructions[c] = instructions[a] + instructions[b];
        currentIndex += 4;
        break;
      case 2:
        instructions[c] = instructions[a] * instructions[b];
        currentIndex += 4;
        break;
      case 3:
        instructions[a] = await input();
        currentIndex += 2;
        break;
      case 4:
        output(instructions[a]);
        currentIndex += 2;
        break;
      case 5:
        if (instructions[a] !== 0) {
          currentIndex = instructions[b];
        } else {
          currentIndex += 3;
        }
        break;
      case 6:
        if (instructions[a] === 0) {
          currentIndex = instructions[b];
        } else {
          currentIndex += 3;
        }
        break;
      case 7:
        instructions[c] = instructions[a] < instructions[b] ? 1 : 0;
        currentIndex += 4;
        break;
      case 8:
        instructions[c] = instructions[a] === instructions[b] ? 1 : 0;
        currentIndex += 4;
        break;

      default:
        throw "Unexpected opt code: " + opcode.code;
    }
    opcode = parseOpcode(instructions[currentIndex]);
  }
}

const compile = (instructions, input$) => {
  let inputQueue = [];
  const nextInputSubject = new Subject();
  const inputSub = input$.subscribe(i => {
    inputQueue.push(i);
    nextInputSubject.next();
  });
  return new Observable(subscribe => {
    const inputCb = () => {
      if (inputQueue.length > 0) {
        const [i] = inputQueue.splice(0, 1);
        return of(i).toPromise();
      } else {
        return nextInputSubject
          .pipe(
            take(1),
            map(() => {
              const [i] = inputQueue.splice(0, 1);
              return i;
            })
          )
          .toPromise();
      }
    };

    run(instructions, inputCb, o => {
      subscribe.next(o);
    }).then(
      () => {
        inputSub.unsubscribe();
        nextInputSubject.complete();
        subscribe.complete();
      },
      e => {
        inputSub.unsubscribe();
        nextInputSubject.complete();
        subscribe.error(e);
      }
    );
  });
};

const parseFile = fileName => {
  return fs
    .readFileSync(fileName, { encoding: "UTF8" })
    .split(/,/g)
    .map(x => +x);
};

module.exports = { compile, parseFile };
