const getDistanceMap = require("./get-distance-map");

module.exports = function(map, from, to, impassableTiles) {
  const distanceMap = getDistanceMap(map, impassableTiles, from);

  let currentStep = distanceMap[to.y][to.x];
  if (currentStep < 0) {
    impassableTiles.add(`${to.x}:${to.y}`);
    return undefined;
  }

  const pos = { ...to };
  const steps = [];
  while (currentStep-- > 0) {
    if (distanceMap[pos.y - 1][pos.x] == currentStep) {
      steps.splice(0, 0, 1);
      pos.y -= 1;
    } else if (distanceMap[pos.y + 1][pos.x] == currentStep) {
      steps.splice(0, 0, 2);
      pos.y += 1;
    } else if (distanceMap[pos.y][pos.x + 1] == currentStep) {
      steps.splice(0, 0, 3);
      pos.x += 1;
    } else {
      steps.splice(0, 0, 4);
      pos.x -= 1;
    }
  }
  return steps;
};
