const { transmissionAlgorithmMultiple } = require("./transmission-algorithm");
const fs = require("fs");

const input = fs.readFileSync("day-16/input.txt", { encoding: "utf8" });

console.log("Part1:", transmissionAlgorithmMultiple(input, 100));
