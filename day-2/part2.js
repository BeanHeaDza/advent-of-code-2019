const run = require("./run");
const { parseFile } = require("../int-code");

const instructions = parseFile("day-2/input.txt");

const target = 19690720;
let noun = 0;
let verb = 0;
let output = run(instructions, noun, verb);

while (output <= target) {
  noun += 1;
  output = run(instructions, noun, verb);
}
noun -= 1;

while (output !== target) {
  verb += 1;
  output = run(instructions, noun, verb);
}

console.log("Part 2:", 100 * noun + verb);
