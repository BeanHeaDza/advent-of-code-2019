const { compile, parseFile } = require("./int-code");
const { Observable, Subject } = require("rxjs");
const { bufferCount } = require("rxjs/operators");
const _ = require("lodash");
const clear = require("clear");
const fs = require("fs");

const instructions = parseFile("d13.txt");
instructions[0] = 2;

const screen = [];
let score = 0;

const tileToScreen = tile => {
  switch (tile) {
    case 0:
      return " ";
    case 1:
      return "|";
    case 2:
      return "#";
    case 3:
      return "_";
    case 4:
      return ".";
    default:
      throw "Unexpected tile: " + tile;
  }
};

const updateBlock = (x, y, block) => {
  if (!screen[y]) {
    screen[y] = [];
  }
  screen[y][x] = block;
};

const renderScreen = () => {
  clear();

  let output = "";
  for (let y = 0; y < screen.length; y++) {
    for (let x = 0; x < screen[y].length; x++) {
      output += screen[y][x] || " ";
    }
    output += "\n";
  }
  console.log(output);
};

const run = (known, speed = 0) => {
  const inputKnown = [...known];
  const moves = [];
  return new Observable(subscribe => {
    const input = new Subject();
    let paddleY, paddleX, lastBallX;
    const waitingForInput = () => {
      setTimeout(() => {
        if (speed > 0) {
          renderScreen();
        }
        let next = 0;
        if (inputKnown.length) {
          [next] = inputKnown.splice(0, 1);
        }
        moves.push(next);
        input.next(next);
      }, speed);
    };
    const pgm = compile(instructions, input, waitingForInput);

    pgm.pipe(bufferCount(3)).subscribe(
      ([x, y, tile]) => {
        if (x == -1 && y == 0) {
          score = tile;
        } else {
          const block = tileToScreen(tile);
          updateBlock(x, y, block);
        }
        if (tile == 3) {
          paddleX = x;
          paddleY = y;
        }
        if (tile == 4 && paddleY - 1 == y) {
          lastBallX = x;
        }
      },
      e => {
        subscribe.error(e);
      },
      () => {
        moves.length -= 2;

        for (let x = moves.length - 1; paddleX < lastBallX; x--) {
          if (moves[x] === -1) {
            if (lastBallX - paddleX > 1) {
              moves[x] = 1;
              paddleX += 2;
            } else {
              moves[x] = 0;
              paddleX += 1;
            }
          } else if (!moves[x]) {
            moves[x] = 1;
            paddleX += 1;
          }
        }

        for (let x = moves.length - 1; paddleX > lastBallX; x--) {
          if (moves[x] === 1) {
            if (paddleX - lastBallX > 1) {
              moves[x] = -1;
              paddleX -= 2;
            } else {
              moves[x] = 0;
              paddleX -= 1;
            }
          } else if (!moves[x]) {
            moves[x] = -1;
            paddleX -= 1;
          }
        }
        if (_.isEqual(moves, known)) {
          subscribe.next(score);
        } else {
          subscribe.next(moves);
        }
        subscribe.complete();
      }
    );
  }).toPromise();
};

run(
  fs
    .readFileSync("q13-path.json", { encoding: "utf8" })
    .split(",")
    .map(x => +x),
  15
).then(score => console.log("score:", score));
