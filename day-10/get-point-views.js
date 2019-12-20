const gradient = require("./gradient");

const getPointViews = (points, index) => {
  const visibleGradients = new Set();
  const target = points[index];

  points.forEach((astroid, i) => {
    if (i !== index) {
      const m = gradient(target, astroid);
      if (m === undefined) {
        visibleGradients.add(`${m}${astroid.y > target.y ? "+" : "-"}`);
      } else {
        visibleGradients.add(`${m}${astroid.x > target.x ? "+" : "-"}`);
      }
    }
  });
  return visibleGradients.size;
};

module.exports = getPointViews;
