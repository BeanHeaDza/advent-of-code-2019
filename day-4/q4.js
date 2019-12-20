const isValid = require("./is-valid");
const isValidPart2 = require("./is-valid-part-2");

let count = 0;
for (let pass = 171309; pass <= 643603; pass++) {
  if (isValid(pass)) {
    count += 1;
  }
}

console.log("Part1:", count);

count = 0;
for (let pass = 171309; pass <= 643603; pass++) {
  if (isValidPart2(pass)) {
    count += 1;
  }
}

console.log("Part2:", count);
