const { readFile } = require("../common");
const getBiodiversityRating = require("./get-biodiversity-rating");
const tick = require("./tick");

let map = readFile("day-24/input.txt", "map");

const diversities = new Set();
diversities.add(getBiodiversityRating(map));

while (true) {
  map = tick(map);
  const diversity = getBiodiversityRating(map);
  if (diversities.has(diversity)) {
    console.log("Part1:", diversity);
    break;
  }
  diversities.add(diversity);
}
