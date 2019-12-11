const fs = require("fs");

const getAstroidPoints = map => {
  const matrix = map.split(/\r?\n/g).map(line => line.split(""));
  return matrix
    .map((row, y) =>
      row.map((astroid, x) => (astroid === "#" ? { x, y } : null))
    )
    .flatMap(row => row)
    .filter(a => a);
};

const gradient = (start, end) => {
  const xDiff = start.x - end.x;
  const yDiff = start.y - end.y;
  if (xDiff === 0) {
    return undefined;
  }
  return yDiff / xDiff;
};

const calculateDistance = (a, b) => {
  const diffX = a.x - b.x;
  const diffY = a.y - b.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
};

// Order:
// -undefined
// ++m
// +0
// +-m
// undefined
// -+m
// -0
// --m
const getGradients = (points, index, dIndex) => {
  const visibleGradients = new Map();
  const target = points[index];

  points.forEach((astroid, i) => {
    if (i !== index) {
      const m = gradient(target, astroid);
      let distance = calculateDistance(target, astroid);
      let key =
        m === undefined
          ? `${astroid.y > target.y ? "+" : "-"}${m}`
          : `${astroid.x > target.x ? "+" : "-"}${m}`;
      let value = visibleGradients.get(key) || [];
      value = [...value, { distance, astroid }].sort(
        (a, b) => a.distance - b.distance
      );
      visibleGradients.set(key, value);
    }
  });

  const getOrder = (plus, m) => {
    if (isNaN(m)) {
      return plus ? 2 : 0;
    }
    return plus ? 1 : 3;
  };

  const orderedKeys = [...visibleGradients.keys()].sort((a, b) => {
    aPlus = a.substr(0, 1) === "+";
    bPlus = b.substr(0, 1) === "+";
    aM = +a.substr(1);
    bM = +b.substr(1);
    aOrder = getOrder(aPlus, aM);
    bOrder = getOrder(bPlus, bM);
    if (aOrder != bOrder) {
      return aOrder - bOrder;
    }
    return aM - bM;
  });

  let destroyedAstroidCount = 0;
  let result;
  while (destroyedAstroidCount < dIndex) {
    orderedKeys
      .map(k => ({ k, astroids: visibleGradients.get(k) }))
      .filter(({ astroids }) => astroids.length)
      .forEach(({ k, astroids }) => {
        const destroyed = astroids.splice(0, 1)[0];
        if (++destroyedAstroidCount === dIndex) {
          result = {
            visibility: orderedKeys.length,
            destroyedIndex: destroyed.astroid.x * 100 + destroyed.astroid.y
          };
        }
      });
  }
  return result;
};

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

const getMaxViews = points => {
  return points.length
    ? points.map((_, i) => getPointViews(points, i)).sort((a, b) => b - a)[0]
    : 0;
};

const getMaxViewsPart2 = (points, dIndex) => {
  return points.length
    ? points
        .map((_, i) => getGradients(points, i, dIndex))
        .sort((a, b) => b.visibility - a.visibility)[0]
    : 0;
};

const content = fs.readFileSync("d10.txt", { encoding: "utf8" });
const p1 = getMaxViews(getAstroidPoints(content));
const p2 = getMaxViewsPart2(getAstroidPoints(content), 200);
console.log("Part1:", p1);
console.log("Part2:", p2);

module.exports = {
  getAstroidPoints,
  getPointViews,
  getMaxViews,
  getMaxViewsPart2
};
