const readPaths = require("./read-paths");
module.exports = function(redLineInstructions, blueLineInstructions) {
  const redWirePaths = readPaths(redLineInstructions);
  const blueWirePaths = readPaths(blueLineInstructions);

  return redWirePaths
    .map(redLine => blueWirePaths.map(blueLine => ({ redLine, blueLine })))
    .flatMap(x => x);
};
