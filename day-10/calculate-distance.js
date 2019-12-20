const calculateDistance = (a, b) => {
  const diffX = a.x - b.x;
  const diffY = a.y - b.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
};

module.exports = calculateDistance;
