const { readFile, readContent } = require("../common");
const getPortals = require("./get-portals");
const calculateDistanceMap = require("./calculate-distance-map-with-portals");

const map = readFile("day-20/input.txt", "map");
const portals = getPortals(map);
console.log(portals);
const distanceMap = calculateDistanceMap(map, portals.AA[0], portals);
const end = portals.ZZ[0];
console.log("Part1:", distanceMap[end.y][end.x]);
