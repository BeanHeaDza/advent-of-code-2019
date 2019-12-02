const fs = require("fs");

const fuelCalc = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel < 0) {
    return 0;
  }
  return fuel;
};

const recursiveFuelCalc = mass => {
  let totalFuel = Math.floor(mass / 3) - 2;
  let fuelFuel = fuelCalc(totalFuel);
  while (fuelFuel > 0) {
    totalFuel += fuelFuel;
    fuelFuel = fuelCalc(fuelFuel);
  }
  return totalFuel;
};

const content = fs.readFileSync("d1.txt", { encoding: "utf8" });
const moduleFuel = content
  .split(/\s/g)
  .filter(l => l)
  .map(mass => fuelCalc(mass))
  .reduce((sum, f) => sum + f, 0);
console.log("part 1", moduleFuel);

const moduleRecursiveFuel = content
  .split(/\s/g)
  .filter(l => l)
  .map(mass => recursiveFuelCalc(mass))
  .reduce((sum, f) => sum + f, 0);
console.log("part 2", moduleRecursiveFuel);
