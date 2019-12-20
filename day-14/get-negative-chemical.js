const getNegativeChemical = chemicals =>
  Object.keys(chemicals)
    .filter(k => k != "ORE")
    .find(k => chemicals[k] < 0);

module.exports = getNegativeChemical;
