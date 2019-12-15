const fs = require("fs");
const calculateFuel = require("./calculate-fuel");

const content = fs.readFileSync("day-1/input.txt", { encoding: "utf8" });
const moduleFuel = content
  .split(/\s/g)
  .filter(l => l)
  .map(mass => calculateFuel(mass))
  .reduce((sum, f) => sum + f, 0);
console.log("Part 1:", moduleFuel);
