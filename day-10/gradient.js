const gradient = (start, end) => {
  const xDiff = start.x - end.x;
  const yDiff = start.y - end.y;
  if (xDiff === 0) {
    return undefined;
  }
  return yDiff / xDiff;
};

module.exports = gradient;
