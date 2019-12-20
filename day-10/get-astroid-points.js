const getAstroidPoints = map => {
  const matrix = map.split(/\r?\n/g).map(line => line.split(""));
  return matrix
    .map((row, y) =>
      row.map((astroid, x) => (astroid === "#" ? { x, y } : null))
    )
    .flatMap(row => row)
    .filter(a => a);
};

module.exports = getAstroidPoints;
