const fs = require("fs");
const getIntersect = require("./get-intersect");
const wires = require("./wires");

const lines = fs
  .readFileSync("day-3/input.txt", { encoding: "utf8" })
  .split("\n");

const closestIntersectionDistance = wires(lines[0], lines[1])
  .map(x => getIntersect(x.redLine, x.blueLine))
  .filter(x => x)
  .map(intersect =>
    Math.sqrt(intersect.x * intersect.x + intersect.y * intersect.y)
  )
  .sort((a, b) => a - b)[0];

console.log("Part 1:", closestIntersectionDistance);
