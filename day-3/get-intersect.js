const gradient = require("./gradient");
const yAxisTouchPoint = require("./y-axis-touch-point");
const intersectPoint = require("./intersect-point");

module.exports = function(lineA, lineB) {
  let intersect;
  const gradientA = gradient(lineA);
  const gradientB = gradient(lineB);
  const yA = yAxisTouchPoint(lineA.start, gradientA);
  const yB = yAxisTouchPoint(lineB.start, gradientB);

  if (gradientA === undefined && gradientB === undefined) {
    if (lineA.start.x === lineB.start.x) {
      throw "Did not implement two y = c checks function";
    }
  } else if (gradientA === undefined) {
    intersect = { x: lineA.start.x, y: gradientB * lineA.start.x + yB };
  } else if (gradientB === undefined) {
    intersect = { x: lineB.start.x, y: gradientA * lineB.start.x + yA };
  } else {
    intersect = intersectPoint(gradientA, yA, gradientB, yB);
  }

  const aMinX = Math.min(lineA.start.x, lineA.end.x);
  const aMaxX = Math.max(lineA.start.x, lineA.end.x);
  const aMinY = Math.min(lineA.start.y, lineA.end.y);
  const aMaxY = Math.max(lineA.start.y, lineA.end.y);
  const bMinX = Math.min(lineB.start.x, lineB.end.x);
  const bMaxX = Math.max(lineB.start.x, lineB.end.x);
  const bMinY = Math.min(lineB.start.y, lineB.end.y);
  const bMaxY = Math.max(lineB.start.y, lineB.end.y);

  if (
    intersect &&
    aMinX <= intersect.x &&
    aMaxX >= intersect.x &&
    aMinY <= intersect.y &&
    aMaxY >= intersect.y &&
    bMinX <= intersect.x &&
    bMaxX >= intersect.x &&
    bMinY <= intersect.y &&
    bMaxY >= intersect.y
  ) {
    return intersect;
  }
  return null;
};
