const lodash = require("lodash");

module.exports = function(map) {
  const newMap = lodash.cloneDeep(map);

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      let adjacentBugs = 0;
      adjacentBugs += (map[y + 1] || [])[x] === "#" ? 1 : 0;
      adjacentBugs += (map[y - 1] || [])[x] === "#" ? 1 : 0;
      adjacentBugs += map[y][x + 1] === "#" ? 1 : 0;
      adjacentBugs += map[y][x - 1] === "#" ? 1 : 0;

      if (map[y][x] === "#" && adjacentBugs !== 1) {
        newMap[y][x] = ".";
      }

      if (map[y][x] === "." && (adjacentBugs === 1 || adjacentBugs === 2)) {
        newMap[y][x] = "#";
      }
    }
  }

  return newMap;
};
