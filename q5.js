const fs = require("fs");

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

const run = (instructions, input) => {
  let currentIndex = 0;
  instructions = [...instructions];

  let opcode = parseOpcode(instructions[0]);
  let previousCallWasNonZeroOutput = false;
  let output = undefined;

  while (opcode.code !== 99) {
    if (previousCallWasNonZeroOutput) {
      debugger;
      return undefined;
    }
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
        instructions[a] = input;
        currentIndex += 2;
        break;
      case 4:
        output = instructions[a];
        if (output !== 0) {
          previousCallWasNonZeroOutput = true;
        }
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
  return output;
};

const program = fs
  .readFileSync("d5.txt", { encoding: "UTF8" })
  .split(/,/g)
  .map(x => +x);

console.log("Part 1:", run(program, 1));
console.log("Part 2:", run(program, 5));

module.exports = {
  parseOpcode,
  run
};
