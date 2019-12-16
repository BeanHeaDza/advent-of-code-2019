const clear = require("clear");
const getMinMax = require("./get-min-max");

module.exports = function(map, drone) {
  const { min, max } = getMinMax(map);

  let output = "";
  for (let y = max.y; y >= min.y; y--) {
    for (let x = min.x; x <= max.x; x++) {
      if (x == drone.x && y == drone.y) {
        output += "D";
      } else {
        output += map[y][x] || " ";
      }
    }
    output += "\n";
  }

  clear();
  console.log(output);
};
