const lodash = require("lodash");
const getAdjacentTiles = require("./get-adjacent-tiles");

function generateNewMap() {
  const map = [...new Array(5)].map(() => [...new Array(5)].map(() => "."));
  map[2][2] = "?";
  return map;
}

function isBug(maps, { level, x, y }) {
  return ((maps[level] || [])[y] || [])[x] === "#";
}

module.exports = function(maps) {
  const newMaps = lodash.cloneDeep(maps);

  const levelKeys = Object.keys(newMaps)
    .map(k => +k)
    .sort((a, b) => a - b);
  const max = levelKeys[levelKeys.length - 1] + 1;
  const min = levelKeys[0] - 1;

  newMaps[min] = generateNewMap();
  newMaps[max] = generateNewMap();

  for (let z = min; z <= max; z++) {
    for (let y = 0; y < newMaps[z].length; y++) {
      for (let x = 0; x < newMaps[z][y].length; x++) {
        if (x === 2 && y === 2) continue;
        const adjacentBugs = getAdjacentTiles(z, x, y)
          .map(tile => (isBug(maps, tile) ? 1 : 0))
          .reduce((sum, b) => sum + b, 0);

        if (maps[z] && maps[z][y][x] === "#" && adjacentBugs !== 1) {
          newMaps[z][y][x] = ".";
        }

        if (
          (!maps[z] || maps[z][y][x] === ".") &&
          (adjacentBugs === 1 || adjacentBugs === 2)
        ) {
          newMaps[z][y][x] = "#";
        }
      }
    }
  }

  const empty = generateNewMap();
  if (lodash.isEqual(empty, newMaps[max])) {
    delete newMaps[max];
  }
  if (lodash.isEqual(empty, newMaps[min])) {
    delete newMaps[min];
  }

  return newMaps;
};
