const { parseFile, compile } = require("../int-code");
const { Subject } = require("rxjs");
const { bufferCount } = require("rxjs/operators");

const instructions = parseFile("day-23/input.txt");
const inputs = [...new Array(50)].map(() => new Subject());
const packages = [...new Array(50)].map((_, index) => [index]);
const programs = [];

let awaitingInput = index => {
  if (packages[index] && packages[index].length) {
    const [next] = packages[index].splice(0, 1);
    inputs[index].next(next);
  } else {
    process.nextTick(() => {
      inputs[index].next(-1);
    });
  }
};

inputs.forEach((input, index) => {
  programs[index] = compile(instructions, input, () => awaitingInput(index))
    .pipe(bufferCount(3))
    .subscribe(([target, x, y]) => {
      if (packages[target]) {
        packages[target].push(x);
        packages[target].push(y);
      } else if (target == 255) {
        console.log("Part1:", y);
        programs.forEach(p => p.unsubscribe());
      }
    });
});
