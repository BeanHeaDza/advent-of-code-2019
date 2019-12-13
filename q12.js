const input = require("./d12.json");
const velocity = input.map(i => ({ x: 0, y: 0, z: 0 }));
const STEPS = 1000;

const compare = (a, b, key) => {
  if (a[key] > b[key]) {
    return -1;
  } else if (a[key] < b[key]) {
    return 1;
  }
  return 0;
};

for (let step = 0; step < STEPS; step++) {
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
}

// Total energy
const totalEnergy = input
  .map(planet => Math.abs(planet.x) + Math.abs(planet.y) + Math.abs(planet.z))
  .map((potentialEnergy, index) => {
    const kineticEnergy =
      Math.abs(velocity[index].x) +
      Math.abs(velocity[index].y) +
      Math.abs(velocity[index].z);
    return potentialEnergy * kineticEnergy;
  })
  .reduce((sum, energy) => sum + energy, 0);
console.log(totalEnergy);
