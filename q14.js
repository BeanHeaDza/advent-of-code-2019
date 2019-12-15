const fs = require("fs");

const parseReactions = content =>
  content.split("\n").map(line => {
    const parts = line.split(" => ");
    const sources = parts[0].split(",");

    const mapReaction = rawString => {
      const match = rawString.match(/(\d+) (\w+)/);
      return {
        quantity: +match[1],
        name: match[2]
      };
    };

    const output = mapReaction(parts[1]);
    const input = sources.map(s => mapReaction(s));

    return { input, output };
  });

const fileReactions = parseReactions(
  fs.readFileSync("d14.txt", { encoding: "utf8" })
);

let allReactions = [];
let chemicals = {};
const loadReaction = (chemical, requiredQuantity) => {
  const { input, output } = allReactions.find(r => r.output.name === chemical);
  const multiplier = Math.ceil(requiredQuantity / output.quantity);

  input.forEach(({ name, quantity }) => {
    chemicals[name] = (chemicals[name] || 0) - quantity * multiplier;
  });

  chemicals[output.name] =
    (chemicals[output.name] || 0) + output.quantity * multiplier;
};

const getNegativeChemical = () =>
  Object.keys(chemicals)
    .filter(k => k != "ORE")
    .find(k => chemicals[k] < 0);

const getOreRequirement = (chemical, quantity, reactions) => {
  allReactions = [...reactions];
  chemicals = { [chemical]: quantity * -1 };

  let currentChemical = getNegativeChemical();
  while (currentChemical) {
    loadReaction(currentChemical, chemicals[currentChemical] * -1);
    currentChemical = getNegativeChemical();
  }
  return chemicals.ORE * -1;
};

const part1 = getOreRequirement("FUEL", 1, fileReactions);

console.log("Part1:", part1);

module.exports = {
  getOreRequirement,
  parseReactions
};
