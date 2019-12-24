const { readFile } = require("../common");
const tick = require("./tick-part2");

const sumFn = (s, x) => (s || 0) + x;

let maps = { 0: readFile("day-24/input.txt", "map") };
maps[0][2][2] = "?";
for (let x = 0; x < 200; x++) {
  maps = tick(maps);
}

const sum = Object.values(maps)
  .map(map =>
    map
      .map(line => line.map(c => (c === "#" ? 1 : 0)).reduce(sumFn))
      .reduce(sumFn)
  )
  .reduce(sumFn);

console.log("Part2:", sum);
