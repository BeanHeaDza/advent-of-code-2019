const fs = require("fs");

const lines = fs.readFileSync("d3.txt", { encoding: "utf8" }).split("\n");

function readPaths(line) {
  const pos = { x: 0, y: 0 };
  let prevStepSum = 0;
  return line.split(",").map(instruction => {
    const start = { ...pos };
    const len = +instruction.slice(1);
    switch (instruction[0]) {
      case "U":
        pos.y += len;
        break;
      case "R":
        pos.x += len;
        break;
      case "D":
        pos.y -= len;
        break;
      case "L":
        pos.x -= len;
        break;

      default:
        throw "Unexpected instruction: " + instruction;
    }
    const result = {
      start,
      end: { ...pos },
      prevStepSum
    };
    prevStepSum += len;
    return result;
  });
}

const gradient = ({ start, end }) => {
  const xDiff = start.x - end.x;
  const yDiff = start.y - end.y;
  if (xDiff === 0) {
    return undefined;
  }
  return yDiff / xDiff;
};

const yAxisTouchPoint = (point, gradient) => {
  return point.y - gradient * point.x;
};

const intersectPoint = (m1, c1, m2, c2) => {
  // m1x + c1 = m2x + c2
  // m1x - m2x = c2 - c1
  // x (m1 - m2) = c2 - c1
  // x = (c2 - c1) / (m1 - m2)
  if (m1 === m2) {
    return undefined;
  }
  const x = (c2 - c1) / (m1 - m2);
  const y = m1 * x + c1;
  return { x, y };
};

function getIntersect(lineA, lineB) {
  let intersect;
  const gradientA = gradient(lineA);
  const gradientB = gradient(lineB);
  const yA = yAxisTouchPoint(lineA.start, gradientA);
  const yB = yAxisTouchPoint(lineB.start, gradientB);

  if (gradientA === undefined && gradientB === undefined) {
    if (lineA.start.x === lineB.start.x) {
      throw "Did not implement two y = c checks function";
    }
  } else if (gradientA === undefined) {
    intersect = { x: lineA.start.x, y: gradientB * lineA.start.x + yB };
  } else if (gradientB === undefined) {
    intersect = { x: lineB.start.x, y: gradientA * lineB.start.x + yA };
  } else {
    intersect = intersectPoint(gradientA, yA, gradientB, yB);
  }

  const aMinX = Math.min(lineA.start.x, lineA.end.x);
  const aMaxX = Math.max(lineA.start.x, lineA.end.x);
  const aMinY = Math.min(lineA.start.y, lineA.end.y);
  const aMaxY = Math.max(lineA.start.y, lineA.end.y);
  const bMinX = Math.min(lineB.start.x, lineB.end.x);
  const bMaxX = Math.max(lineB.start.x, lineB.end.x);
  const bMinY = Math.min(lineB.start.y, lineB.end.y);
  const bMaxY = Math.max(lineB.start.y, lineB.end.y);

  if (
    intersect &&
    aMinX <= intersect.x &&
    aMaxX >= intersect.x &&
    aMinY <= intersect.y &&
    aMaxY >= intersect.y &&
    bMinX <= intersect.x &&
    bMaxX >= intersect.x &&
    bMinY <= intersect.y &&
    bMaxY >= intersect.y
  ) {
    return intersect;
  }
  return null;
}

function distance(a, b) {
  const diffX = a.x - b.x;
  const diffY = a.y - b.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

const wires = () => {
  const redWirePaths = readPaths(lines[0]);
  const blueWirePaths = readPaths(lines[1]);

  return redWirePaths
    .map(redLine => blueWirePaths.map(blueLine => ({ redLine, blueLine })))
    .flatMap(x => x);
};

const part1 = () => {
  const groups = wires()
    .map(x => getIntersect(x.redLine, x.blueLine))
    .filter(x => x)
    .map(intersect =>
      Math.sqrt(intersect.x * intersect.x + intersect.y * intersect.y)
    )
    .sort((a, b) => a - b);
  console.log("part 1:", groups[0]);
};

const part2 = () => {
  const steps = wires()
    .map(({ redLine, blueLine }) => {
      const intersect = getIntersect(redLine, blueLine);
      if (!intersect) {
        return null;
      }

      const steps =
        redLine.prevStepSum +
        blueLine.prevStepSum +
        distance(redLine.start, intersect) +
        distance(blueLine.start, intersect);

      return steps;
    })
    .filter(x => x)
    .sort((a, b) => a - b);
  console.log("part 2:", steps[0]);
};

part1();
part2();

module.exports = {
  readPaths,
  getIntersect
};
