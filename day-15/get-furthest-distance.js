const getDistanceMap = require("./get-distance-map");
const getMinMax = require("./get-min-max");

module.exports = function(map, impassableTiles, oxygenTile) {
  const distanceMap = getDistanceMap(map, impassableTiles, oxygenTile);
  const { min, max } = getMinMax(map);

  let furthest = 0;
  for (let y = max.y; y >= min.y; y--) {
    for (let x = min.x; x <= max.x; x++) {
      if (distanceMap[y][x] > furthest) {
        furthest = distanceMap[y][x];
      }
    }
  }

  return furthest;
};
