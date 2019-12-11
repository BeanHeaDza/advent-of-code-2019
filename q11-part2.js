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

input$.next(1);

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
    const keys = [...paintedPanels.keys()]
      .map(k => k.split(";"))
      .map(([x, y]) => ({ x: +x, y: +y }));
    const maxY = keys.reduce(
      (max, coordinate) => (coordinate.y > max ? coordinate.y : max),
      0
    );
    const minY = keys.reduce(
      (min, coordinate) => (coordinate.y < min ? coordinate.y : min),
      999999999999
    );
    const maxX = keys.reduce(
      (max, coordinate) => (coordinate.x > max ? coordinate.x : max),
      0
    );
    const minX = keys.reduce(
      (min, coordinate) => (coordinate.x < min ? coordinate.x : min),
      999999999999
    );

    let output = "";
    for (let y = maxY; y >= minY; y--) {
      for (let x = minX; x <= maxX; x++) {
        const key = `${x};${y}`;
        const color = paintedPanels.get(key) || 0;
        output += color == 1 ? "#" : " ";
      }
      output += "\n";
    }

    console.log(output);
  }
);
