const { compile, parseFile } = require("./program");
const { Subject } = require("rxjs");
const { bufferCount } = require("rxjs/operators");

const input$ = new Subject();
const pgm = compile(parseFile("d11.txt"), input$);

let angle = 0;
let x = 0;
let y = 0;
const paintedPanels = new Map();

const correctAngel = () => {
  while (angle >= 360) {
    angle -= 360;
  }
  while (angle < 0) {
    angle += 360;
  }
};

const moveOnce = () => {
  switch (angle) {
    case 0:
      y += 1;
      break;
    case 90:
      x += 1;
      break;
    case 180:
      y -= 1;
      break;
    case 270:
      x -= 1;
      break;

    default:
      throw "Unexpected angle: " + angle;
  }
};

input$.next(0);

pgm.pipe(bufferCount(2)).subscribe(
  ([color, direction]) => {
    // Paint the panel
    paintedPanels.set(`${x};${y}`, color);

    // Turn the robot
    angle += direction == 1 ? 90 : -90;
    correctAngel();

    // Move forwards once
    moveOnce();

    // input the new location color to the bot
    const key = `${x};${y}`;
    input$.next(paintedPanels.has(key) ? paintedPanels.get(key) : 0);
  },
  () => {},
  () => {
    console.log("Part1:", paintedPanels.size);
  }
);
