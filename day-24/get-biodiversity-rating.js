module.exports = function(map) {
  return map
    .flatMap(line => line)
    .reduce(
      (sum, value, index) => sum + (value === "#" ? Math.pow(2, index) : 0),
      0
    );
};
