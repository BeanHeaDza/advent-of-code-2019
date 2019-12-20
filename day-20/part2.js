const { readFile } = require("../common");
const getPortals = require("./get-portals");
const mapFloors = require("./map-floors");
const clear = require("clear");
const prettyMilliseconds = require("pretty-ms");

const map = readFile("day-20/input.txt", "map");
const portals = getPortals(map);
const allFloors = mapFloors(map, portals);
const startingFloor = allFloors.find(f => Object.keys(f).includes("AA"));
let answer;
const stackLimit = allFloors.length / 2;

const todo = [];
function move(level, distance, target, floors = []) {
  if (target.portal === "ZZ" && level === 0) {
    distance += target.distance;
    if (answer === undefined || distance < answer) {
      answer = distance;
    }
  } else if (
    target.targetFloor &&
    floors.filter(f => f === target.targetFloor).length < stackLimit
  ) {
    target.targetFloor[target.portal].forEach(t => {
      const targetLevel = level + (target.move === "down" ? 1 : -1);
      if (targetLevel >= 0) {
        todo.push(() =>
          move(targetLevel, distance + target.distance + 1, t, [
            ...floors,
            target.targetFloor
          ])
        );
      }
    });
  }
}
startingFloor.AA.forEach(target => todo.push(() => move(0, 0, target)));

const start = new Date().getTime();
let lastTime = new Date().getTime();
let low, high;
while (todo.length) {
  todo.pop()();
  low = !low || todo.length < low ? todo.length : low;
  high = !high || todo.length > high ? todo.length : high;
  const now = new Date().getTime();
  if (now - lastTime > 1000) {
    lastTime = now;
    clear();
    console.log(`run time: ${prettyMilliseconds(now - start)}`);
    console.log("answer:", answer);
    console.log(`todo high: ${high}, low: ${low}`);
    low = high = null;
  }
}

clear();
console.log("Part2:", answer);
