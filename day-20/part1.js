const { readFile } = require("../common");
const getPortals = require("./get-portals");
const calculateDistanceMap = require("./calculate-distance-map-with-portals");

const map = readFile("day-20/input.txt", "map");
const portals = getPortals(map);
const start = portals.AA[0];
const end = portals.ZZ[0];
const distanceMap = calculateDistanceMap(map, start, portals);
console.log("Part1:", distanceMap[end.y][end.x]);
