module.exports = function(point, gradient) {
  return point.y - gradient * point.x;
};
