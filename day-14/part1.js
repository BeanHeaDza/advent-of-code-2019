const fs = require("fs");
const parseReactions = require("./parse-reactions");
const getOreRequirement = require("./get-ore-requirement");

const fileReactions = parseReactions(
  fs.readFileSync("day-14/input.txt", { encoding: "utf8" })
);

console.log("Part1:", getOreRequirement("FUEL", 1, fileReactions));
