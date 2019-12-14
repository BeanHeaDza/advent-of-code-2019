const fs = require("fs");
const { parseReactions, getOreRequirement } = require("./q14");

const fileReactions = parseReactions(
  fs.readFileSync("d14.txt", { encoding: "utf8" })
);

const oreCosts = {
  ORE: 1
};

const getOreCost = chemicalName => {
  if (oreCosts[chemicalName]) {
    return oreCosts[chemicalName];
  }

  const { input, output } = fileReactions.find(
    x => x.output.name === chemicalName
  );
  const cost = input
    .map(({ name, quantity }) => getOreCost(name) * quantity)
    .reduce((sum, c) => sum + c, 0);
  oreCosts[chemicalName] = cost / output.quantity;
  return oreCosts[chemicalName];
};

const orePerFuel = getOreCost("FUEL");
const oreAmount = 1000000000000;
let fuel = Math.ceil(oreAmount / orePerFuel);

while (getOreRequirement("FUEL", fuel, fileReactions) > oreAmount) fuel--;

console.log("Part2:", fuel);

module.exports = {};
