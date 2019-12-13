const _ = require("lodash");
const input = require("./d12.json");
const velocity = input.map(i => ({ x: 0, y: 0, z: 0 }));

const origin = _.cloneDeep(input);
const originVelocity = _.cloneDeep(velocity);
const originX = origin.map(p => p.x);
const originY = origin.map(p => p.y);
const originZ = origin.map(p => p.z);
const originVelocitySingle = originVelocity.map(p => p.x);

const compare = (a, b, key) => {
  if (a[key] > b[key]) {
    return -1;
  } else if (a[key] < b[key]) {
    return 1;
  }
  return 0;
};

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function lcm_two_numbers(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

let steps = 0;
const repeat = { x: null, y: null, z: null };
const checkRepeat = (key, origin) => {
  if (repeat[key]) {
    return;
  }

  if (
    _.isEqual(
      input.map(p => p[key]),
      origin
    ) &&
    _.isEqual(
      velocity.map(v => v[key]),
      originVelocitySingle
    )
  ) {
    console.log(`Repeat for ${key} is at ${steps} steps.`);
    repeat[key] = steps;
  }
};
do {
  steps += 1;
  // Gravity
  input.forEach((planet, index) => {
    let change = { x: 0, y: 0, z: 0 };
    input
      .filter(otherPlanet => otherPlanet !== planet)
      .forEach(otherPlanet => {
        change.x += compare(planet, otherPlanet, "x");
        change.y += compare(planet, otherPlanet, "y");
        change.z += compare(planet, otherPlanet, "z");
      });

    velocity[index].x += change.x;
    velocity[index].y += change.y;
    velocity[index].z += change.z;
  });

  // Move
  input.forEach((planet, index) => {
    planet.x += velocity[index].x;
    planet.y += velocity[index].y;
    planet.z += velocity[index].z;
  });

  checkRepeat("x", originX);
  checkRepeat("y", originY);
  checkRepeat("z", originZ);

  if (repeat.x && repeat.y && repeat.z) {
    steps = lcm_two_numbers(lcm_two_numbers(repeat.x, repeat.y), repeat.z);
    break;
  }
} while (!_.isEqual(input, origin) || !_.isEqual(velocity, originVelocity));

console.log(steps);
