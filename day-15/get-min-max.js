module.exports = function(map, offset = 0) {
  const min = {
    x: 9999999999,
    y: 9999999999
  };
  const max = {
    x: -9999999999,
    y: -9999999999
  };

  Object.keys(map).forEach(y => {
    y = +y;
    Object.keys(map[y]).forEach(x => {
      x = +x;
      max.x = x > max.x ? x : max.x;
      min.x = x < min.x ? x : min.x;
    });
    max.y = y > max.y ? y : max.y;
    min.y = y < min.y ? y : min.y;
  });

  min.x -= offset;
  min.y -= offset;
  max.x += offset;
  max.y += offset;

  return { min, max };
};
