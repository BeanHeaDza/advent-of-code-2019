const gradient = require("./gradient");
const calculateDistance = require("./calculate-distance");

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

module.exports = getGradients;
