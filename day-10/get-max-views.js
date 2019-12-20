const getPointViews = require("./get-point-views");

const getMaxViews = points => {
  return points.length
    ? points.map((_, i) => getPointViews(points, i)).sort((a, b) => b - a)[0]
    : 0;
};
module.exports = getMaxViews;
