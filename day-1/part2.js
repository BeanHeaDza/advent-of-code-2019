const fs = require("fs");
const calculateFuelRecursive = require("./calculate-fuel-recursive");

const content = fs.readFileSync("day-1/input.txt", { encoding: "utf8" });
const moduleFuel = content
  .split(/\s/g)
  .filter(l => l)
  .map(mass => calculateFuelRecursive(mass))
  .reduce((sum, f) => sum + f, 0);
console.log("Part 2:", moduleFuel);
