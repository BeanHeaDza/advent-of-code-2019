module.exports = function(level, x, y) {
  const result = [];
  // Top
  if (y === 0) {
    result.push({ level: level - 1, x: 2, y: 1 });
  } else if (x === 2 && y === 3) {
    result.push(
      ...[...new Array(5)].map((_, index) => ({
        level: level + 1,
        x: index,
        y: 4
      }))
    );
  } else {
    result.push({ level, x, y: y - 1 });
  }

  // Bottom
  if (y === 4) {
    result.push({ level: level - 1, x: 2, y: 3 });
  } else if (x === 2 && y === 1) {
    result.push(
      ...[...new Array(5)].map((_, index) => ({
        level: level + 1,
        x: index,
        y: 0
      }))
    );
  } else {
    result.push({ level, x, y: y + 1 });
  }

  // Left
  if (x === 0) {
    result.push({ level: level - 1, x: 1, y: 2 });
  } else if (x === 3 && y === 2) {
    result.push(
      ...[...new Array(5)].map((_, index) => ({
        level: level + 1,
        x: 4,
        y: index
      }))
    );
  } else {
    result.push({ level, x: x - 1, y });
  }

  // Right
  if (x === 4) {
    result.push({ level: level - 1, x: 3, y: 2 });
  } else if (x === 1 && y === 2) {
    result.push(
      ...[...new Array(5)].map((_, index) => ({
        level: level + 1,
        x: 0,
        y: index
      }))
    );
  } else {
    result.push({ level, x: x + 1, y });
  }

  return result;
};
