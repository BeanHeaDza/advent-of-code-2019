const calculateDistanceMap = require("./calculate-distance-map-with-portals");
const lodash = require("lodash");
const { combinationsGenerator } = require("../common");

function getFloor(map, currentPortals, portalLookup) {
  const combinations = combinationsGenerator(currentPortals, 2);
  const distanceMaps = currentPortals
    .slice(0, currentPortals.length - 1)
    .map(p => calculateDistanceMap(map, p, {}));

  const floor = currentPortals
    .map(({ x, y }) => portalLookup.get(`${x}:${y}`).portal)
    .reduce((o, p) => ({ ...o, [p]: [] }), {});

  if (Object.keys(floor).length !== currentPortals.length) {
    throw "Did not expect a portal to have two entries on the same floor";
  }

  combinations.forEach(([start, stop]) => {
    const startPortal = portalLookup.get(`${start.x}:${start.y}`);
    const stopPortal = portalLookup.get(`${stop.x}:${stop.y}`);
    const distance =
      distanceMaps[currentPortals.indexOf(start)][stop.y][stop.x];

    floor[startPortal.portal].push({
      portal: stopPortal.portal,
      move: stopPortal.location === "outer" ? "up" : "down",
      distance
    });
    floor[stopPortal.portal].push({
      portal: startPortal.portal,
      move: startPortal.location === "outer" ? "up" : "down",
      distance
    });
  });
  return floor;
}

module.exports = function(map, portals) {
  const portalLookup = new Map();
  Object.keys(portals).forEach(p => {
    portals[p].forEach(({ x, y, location }) =>
      portalLookup.set(`${x}:${y}`, { portal: p, location })
    );
  });

  let allPortals = [...portalLookup.keys()].map(k => {
    const [x, y] = k.split(":").map(z => +z);
    return { x, y };
  });
  const floors = [];

  while (allPortals.length) {
    const distanceMap = calculateDistanceMap(map, allPortals[0], {});
    const effectedPortals = [];
    allPortals = allPortals.filter(p => {
      if (distanceMap[p.y][p.x] === null) {
        return true;
      }

      effectedPortals.push(p);
      return false;
    });
    floors.push(getFloor(map, effectedPortals, portalLookup));
  }

  floors.forEach((floor, index) => {
    Object.keys(floor).forEach(fromPortalName => {
      const toArray = floor[fromPortalName];
      toArray.forEach(toPortal => {
        toPortal.targetFloor = floors.find(
          f => f !== floor && Object.keys(f).includes(toPortal.portal)
        );
      });
    });
  });

  return floors;
};
