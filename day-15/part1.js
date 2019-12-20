const { parseFile, compile } = require("../int-code");
const { Subject } = require("rxjs");
const displayMap = require("./display-map");
const findNextTarget = require("./find-next-target");
const getPath = require("./get-path");
const getFurthestDistance = require("./get-furthest-distance");

const instructions = parseFile("day-15/input.txt");
const input = new Subject();
let location = { x: 0, y: 0 };
let lastDirection = 1;
let target, path, oxygenLocation, subscription;
const impassableTiles = new Set();
const map = [];

const awaitingInput = () => {
  process.nextTick(() => {
    if (!target) {
      do {
        target = findNextTarget(map, location, impassableTiles);
        if (target) {
          path = getPath(map, location, target, impassableTiles);
        }
      } while (target && !path);
    }
    displayMap(map, location);
    if (target) {
      [lastDirection] = path.splice(0, 1);
      input.next(lastDirection);
    } else {
      console.log(
        "Part1:",
        getPath(map, { x: 0, y: 0 }, oxygenLocation, impassableTiles).length
      );

      const furthest = getFurthestDistance(
        map,
        impassableTiles,
        oxygenLocation
      );
      console.log("Part2:", furthest);
      subscription.unsubscribe();
    }
  });
};

const newLocation = (location, direction) => {
  switch (+direction) {
    case 1:
      return { ...location, y: location.y + 1 };
    case 2:
      return { ...location, y: location.y - 1 };
    case 3:
      return { ...location, x: location.x - 1 };
    case 4:
      return { ...location, x: location.x + 1 };

    default:
      throw "Unexpected direction: " + direction;
  }
};

const paintBlock = (map, loc, c) => {
  if (!map[loc.y]) {
    map[loc.y] = [];
  }
  map[loc.y][loc.x] = c;
};

const pgm = compile(instructions, input, awaitingInput);
paintBlock(map, { x: 0, y: 0 }, ".");

subscription = pgm.subscribe(
  output => {
    const targetBlock = newLocation(location, lastDirection);
    if (targetBlock.x == target.x && targetBlock.y == target.y) {
      target = null;
    }
    switch (+output) {
      case 0:
        paintBlock(map, targetBlock, "#");
        target = null;
        break;
      case 1:
        paintBlock(map, targetBlock, ".");
        location = targetBlock;
        break;
      case 2:
        paintBlock(map, targetBlock, "O");
        location = targetBlock;
        oxygenLocation = { ...targetBlock };
        break;

      default:
        throw "Unknown bot response: " + output;
    }
  },
  e => {
    throw e;
  }
);
