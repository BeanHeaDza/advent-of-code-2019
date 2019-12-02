const fs = require("fs");

const run = (instructions, n, v) => {
  let currentIndex = 0;
  // Don't mutate the input
  instructions = [...instructions];
  instructions[1] = n;
  instructions[2] = v;

  while (instructions[currentIndex] !== 99) {
    const a = instructions[currentIndex + 1];
    const b = instructions[currentIndex + 2];
    const c = instructions[currentIndex + 3];
    switch (instructions[currentIndex]) {
      case 1:
        instructions[c] = instructions[a] + instructions[b];
        break;
      case 2:
        instructions[c] = instructions[a] * instructions[b];
        break;
      default:
        throw "Unexpected opt code: " + instructions[currentIndex];
    }
    currentIndex += 4;
  }
  return instructions[0];
};

const program = fs
  .readFileSync("d2.txt", { encoding: "UTF8" })
  .split(/,/g)
  .map(x => +x);

console.log("Part 1: Value at 0 index:", run(program, 12, 2));

const target = 19690720;
let noun = 0;
let verb = 0;
let output = run(program, noun, verb);

while (output <= target) {
  noun += 1;
  output = run(program, noun, verb);
}
noun -= 1;

while (output !== target) {
  verb += 1;
  output = run(program, noun, verb);
}

console.log("Part 2:", 100 * noun + verb);

// while(output !== 19690720) {
//   if (output)
// }
