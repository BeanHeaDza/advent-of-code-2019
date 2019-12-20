const { of } = require("rxjs");
const { parseFile, compile } = require("../int-code");

const instructions = parseFile("day-5/input.txt");
let p1, p2;
compile(instructions, of(1)).subscribe(o => (p1 = o));
compile(instructions, of(5)).subscribe(o => (p2 = o));

console.log("Part 1:", p1);
console.log("Part 2:", p2);
