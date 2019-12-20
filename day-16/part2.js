const fs = require("fs");

const input = fs
  .readFileSync("day-16/input.txt", { encoding: "utf8" })
  .repeat(10000)
  .split("")
  .map(x => +x);

const offset = +input.slice(0, 7).join("");

if (offset < input.length / 2) {
  console.log("offset", offset);
  console.log("input.length", input.length);
  throw "Cumulative sum won't work for this input";
}

for (let n = 0; n < 100; n++) {
  for (let x = input.length - 1; x >= offset; x--) {
    input[x] = ((input[x + 1] || 0) + input[x]) % 10;
  }
}
console.log("Part2:", input.slice(offset, offset + 8).join(""));
