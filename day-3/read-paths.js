module.exports = function readPaths(line) {
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
};
