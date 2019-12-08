const fs = require("fs");
const content = fs.readFileSync("d8.txt", { encoding: "utf8" });

const maxX = 25;
const maxY = 6;
const framesCount = content.length / maxX / maxY;

let x = 0;
let y = 0;
let f = 0;

let frames = [];
for (let iF = 0; iF < framesCount; iF++) {
  const frame = [];
  for (let iY = 0; iY < maxY; iY++) {
    frame.push([]);
  }
  frames.push(frame);
}

content.split("").forEach((d, i) => {
  x = i % maxX;
  y = Math.floor(i / maxX) % maxY;
  f = Math.floor(i / maxY / maxX);
  frames[f][y][x] = +d;
});

const frame0 = frames
  .map(f => f.flatMap(x => x))
  .map(pixes => ({
    zero: pixes.filter(p => p === 0).length,
    ones: pixes.filter(p => p === 1).length,
    twos: pixes.filter(p => p === 2).length
  }))
  .sort((a, b) => a.zero - b.zero)[0];
console.log("Part1:", frame0.ones * frame0.twos);

const output = [];
for (let iY = 0; iY < maxY; iY++) {
  output.push([]);
}
for (let iY = 0; iY < maxY; iY++) {
  for (let iX = 0; iX < maxX; iX++) {
    output[iY][iX] = " ";
    for (let iF = 0; iF < framesCount; iF++) {
      const num = frames[iF][iY][iX];
      if (num !== 2) {
        output[iY][iX] = num == 1 ? "1" : " ";
        break;
      }
    }
  }
}

console.log(output.map(r => r.join("")).join("\n"));
