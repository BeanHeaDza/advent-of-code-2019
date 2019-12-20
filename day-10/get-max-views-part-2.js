const getGradients = require("./get-gradients");

const getMaxViewsPart2 = (points, dIndex) => {
  return points.length
    ? points
        .map((_, i) => getGradients(points, i, dIndex))
        .sort((a, b) => b.visibility - a.visibility)[0]
    : 0;
};
module.exports = getMaxViewsPart2;
