const fs = require("fs");
const getIntersect = require("./get-intersect");
const distance = require("./distance");
const wires = require("./wires");

const lines = fs
  .readFileSync("day-3/input.txt", { encoding: "utf8" })
  .split("\n");

const shortestSteps = wires(lines[0], lines[1])
  .map(({ redLine, blueLine }) => {
    const intersect = getIntersect(redLine, blueLine);
    if (!intersect) {
      return null;
    }

    const steps =
      redLine.prevStepSum +
      blueLine.prevStepSum +
      distance(redLine.start, intersect) +
      distance(blueLine.start, intersect);

    return steps;
  })
  .filter(x => x)
  .sort((a, b) => a - b)[0];
console.log("Part 2:", shortestSteps);
