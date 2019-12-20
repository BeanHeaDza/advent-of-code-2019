function isAlpha(c) {
  return /^[A-Z]$/g.test(c);
}

module.exports = function(map) {
  const portals = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isAlpha(map[y][x])) {
        let key, value;
        if (map[y + 1] && isAlpha(map[y + 1][x])) {
          key = map[y][x] + map[y + 1][x];
          if (map[y - 1] && map[y - 1][x] === ".") {
            value = { x, y: y - 1 };
          } else if (map[y + 2] && map[y + 2][x] === ".") {
            value = { x, y: y + 2 };
          }
        } else if (isAlpha(map[y][x + 1])) {
          key = map[y][x] + map[y][x + 1];
          if (map[y][x - 1] === ".") {
            value = { x: x - 1, y };
          } else if (map[y][x + 2] === ".") {
            value = { x: x + 2, y };
          }
        }
        if (key) {
          if (!value) throw "Expected a path next the the portal name";
          if (!portals[key]) portals[key] = [];
          portals[key].push(value);
        }
      }
    }
  }
  return portals;
};
