module.exports = function(m1, c1, m2, c2) {
  // m1x + c1 = m2x + c2
  // m1x - m2x = c2 - c1
  // x (m1 - m2) = c2 - c1
  // x = (c2 - c1) / (m1 - m2)
  if (m1 === m2) {
    return undefined;
  }
  const x = (c2 - c1) / (m1 - m2);
  const y = m1 * x + c1;
  return { x, y };
};
