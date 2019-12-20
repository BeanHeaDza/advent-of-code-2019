const fs = require("fs");
const getAstroidPoints = require("./get-astroid-points");
const getMaxViews = require("./get-max-views");
const getMaxViewsPart2 = require("./get-max-views-part-2");

const content = fs.readFileSync("day-10/input.txt", { encoding: "utf8" });
const points = getAstroidPoints(content);
const p1 = getMaxViews(points);
const p2 = getMaxViewsPart2(points, 200);
console.log("Part1:", p1);
console.log("Part2:", p2.destroyedIndex);
