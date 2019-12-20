const { from } = require("rxjs");
const { parseFile } = require("../int-code");
const { compile } = require("../program");

const instructions = parseFile("day-19/input.txt");
// Skip the first 50 lines, see the input of part 1 to see why
const map = new Array(50);
map.push({ start: 0, end: 0, startDone: false, endDone: false });
let currentLine = map[map.length - 1];

function solved() {
  let y = map.length - 100;
  let top = map[y];
  let bottom = map[map.length - 1];
  if (top && top.end - 99 >= bottom.start) {
    console.log("Part2:", bottom.start * 10000 + y);
    return true;
  }
  return false;
}

function scan() {
  let next;
  if (!currentLine.startDone) {
    next = { x: currentLine.start, y: map.length - 1 };
  } else if (!currentLine.endDone) {
    next = { x: currentLine.end, y: map.length - 1 };
  } else {
    throw "Start and end can't be done when scanning!";
  }

  const pgm = compile(instructions, from([next.x, next.y]));
  pgm.subscribe(
    output => {
      if (!currentLine.startDone) {
        if (output) {
          currentLine.startDone = true;
          if (currentLine.start > currentLine.end) {
            currentLine.end = currentLine.start;
          }
        } else {
          currentLine.start += 1;
        }
      } else if (!currentLine.endDone) {
        if (output) {
          currentLine.end += 1;
        } else {
          currentLine.end -= 1;
          currentLine.endDone = true;
        }
      }
    },
    e => {
      throw e;
    },
    () => {
      if (currentLine.endDone && currentLine.startDone) {
        if (solved()) {
          return;
        }
        const nextLine = { ...currentLine, startDone: false, endDone: false };
        map.push(nextLine);
        currentLine = nextLine;
      }
      scan();
    }
  );
}

scan();
