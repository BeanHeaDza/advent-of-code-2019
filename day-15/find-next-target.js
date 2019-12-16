const getMinMax = require("./get-min-max");
const getDistanceMap = require("./get-distance-map");

function getTile(map, x, y) {
  return map[y] ? map[y][x] || " " : " ";
}

module.exports = function(map, location, impassableTiles) {
  const distanceMap = getDistanceMap(map, impassableTiles, location);
  const { min, max } = getMinMax(map, 1);

  let closestDistance = 99999999999;
  let closest;
  for (let y = max.y; y >= min.y; y--) {
    for (let x = min.x; x <= max.x; x++) {
      if (getTile(map, x, y) == " " && !impassableTiles.has(`${x}:${y}`)) {
        if (distanceMap[y][x] < closestDistance) {
          closestDistance = distanceMap[y][x];
          closest = { x, y };
        }
      }
    }
  }

  return closest;
};
