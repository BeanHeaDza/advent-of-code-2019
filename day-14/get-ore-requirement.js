const loadReaction = require("./load-reaction");
const getNegativeChemical = require("./get-negative-chemical");

const getOreRequirement = (chemical, quantity, reactions) => {
  let allReactions = [...reactions];
  let chemicals = { [chemical]: quantity * -1 };

  let currentChemical = getNegativeChemical(chemicals);
  while (currentChemical) {
    loadReaction(
      currentChemical,
      chemicals[currentChemical] * -1,
      allReactions,
      chemicals
    );
    currentChemical = getNegativeChemical(chemicals);
  }
  return chemicals.ORE * -1;
};
module.exports = getOreRequirement;
