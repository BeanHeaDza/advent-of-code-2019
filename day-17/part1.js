const { compile } = require("../program");
const { parseFile } = require("../int-code");
const { EMPTY } = require("rxjs");

const instructions = parseFile("day-17/input.txt");
const pgm = compile(instructions, EMPTY);

function isCrossing(x, y, map) {
  return (
    map[y][x] == "#" &&
    (map[y + 1] || [])[x] == "#" &&
    (map[y - 1] || [])[x] == "#" &&
    map[y][x + 1] == "#" &&
    map[y][x - 1] == "#"
  );
}

let mapString = "";
pgm.subscribe(
  output => (mapString += String.fromCharCode(output)),
  () => {},
  () => {
    const map = mapString.split("\n").map(line => line.split(""));
    let sum = 0;
    for (let y = 0; y < map.length; y++)
      for (let x = 0; x < map[y].length; x++) {
        if (isCrossing(x, y, map)) {
          sum += x * y;
        }
      }
    console.log("Part1:", sum);
  }
);
