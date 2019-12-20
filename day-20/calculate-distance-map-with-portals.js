function parsePortals(portals) {
  const portalLookup = new Map();
  Object.keys(portals).forEach(portal => {
    portals[portal].forEach(({ x, y }) => {
      portalLookup.set(`${x}:${y}`, portal);
    });
  });

  return (x, y) => {
    const portal = portalLookup.get(`${x}:${y}`);
    const links = portal ? portals[portal] : [];
    return links.filter(link => link.x !== x && link.y !== y);
  };
}

// Does not allow for two portals pointing to the same location
module.exports = function(map, start, portals) {
  const allowedBlocks = new Set(["."]);
  const distanceMap = map.map(line => line.map(() => null));
  const getPortalPaths = parsePortals(portals);

  const todo = [];
  function go(x, y, distance) {
    if (distanceMap[y] === undefined || distanceMap[y][x] === undefined) {
      return;
    }
    distanceMap[y][x] = distance;

    const canUpdate = (x1, y1) => {
      return (
        allowedBlocks.has((map[y1] || [])[x1]) &&
        (distanceMap[y1][x1] === null || distanceMap[y1][x1] > distance + 1)
      );
    };
    if (canUpdate(x, y + 1)) {
      todo.push(() => go(x, y + 1, distance + 1));
    }
    if (canUpdate(x, y - 1)) {
      todo.push(() => go(x, y - 1, distance + 1));
    }
    if (canUpdate(x + 1, y)) {
      todo.push(() => go(x + 1, y, distance + 1));
    }
    if (canUpdate(x - 1, y)) {
      todo.push(() => go(x - 1, y, distance + 1));
    }

    getPortalPaths(x, y).forEach(link => {
      if (
        distanceMap[link.y][link.x] === null ||
        distanceMap[link.y][link.x] > distance + 1
      ) {
        todo.push(() => go(link.x, link.y, distance + 1));
      }
    });
  }

  todo.push(() => go(start.x, start.y, 0));

  while (todo.length) todo.pop()();

  return distanceMap;
};
