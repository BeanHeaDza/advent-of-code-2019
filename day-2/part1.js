const run = require("./run");
const { parseFile } = require("../int-code");

const instructions = parseFile("day-2/input.txt");

console.log("Part 1:", run(instructions, 12, 2));
