const getMinMax = require("./get-min-max");

function getTile(map, x, y) {
  return map[y] ? map[y][x] || " " : " ";
}

function negativeToMax(num) {
  return num < 0 ? randomMax : num;
}

const randomMax = 9999999999999;

module.exports = function(map, impassableTiles, from) {
  const { min, max } = getMinMax(map, 2);
  distanceMap = {};
  for (let y = max.y; y >= min.y; y--) {
    distanceMap[y] = {};
    for (let x = max.x; x >= min.x; x--) {
      if (impassableTiles.has(`${x}:${y}`) || getTile(map, x, y) == "#") {
        distanceMap[y][x] = -2;
      } else {
        distanceMap[y][x] = -1;
      }
    }
  }

  distanceMap[from.y][from.x] = 0;
  let updatedABlock;
  do {
    updatedABlock = false;
    for (let y = max.y - 1; y > min.y; y--) {
      for (let x = min.x + 1; x < max.x; x++) {
        if (distanceMap[y][x] == -1) {
          const min = Math.min(
            negativeToMax(distanceMap[y][x + 1]),
            negativeToMax(distanceMap[y][x - 1]),
            negativeToMax(distanceMap[y - 1][x]),
            negativeToMax(distanceMap[y + 1][x])
          );
          if (min < randomMax) {
            distanceMap[y][x] = min + 1;
            updatedABlock = true;
          }
        }
      }
    }
  } while (updatedABlock);

  return distanceMap;
};
