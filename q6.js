const fs = require("fs");

const content = fs.readFileSync("d6.txt", { encoding: "utf8" });
const lines = content.split(/\n/g);

const orbits = lines.map(l => {
  const parts = l.split(")");
  return { center: parts[0], orbiter: parts[1] };
});

class Orbiter {
  constructor(name) {
    this.name = name;
  }

  getOrbits() {
    if (!this.parent) {
      return 0;
    }
    return 1 + this.parent.getOrbits();
  }

  setParent(parent) {
    if (this.parent) {
      throw "Not expecting two parent!";
    }

    this.parent = parent;
  }

  getParentList() {
    const output = [];
    let parent = this.parent;
    while (parent) {
      output.splice(0, 0, parent.name);
      parent = parent.parent;
    }
    return output;
  }
}

const objects = {};

orbits.forEach(o => {
  let parent = objects[o.center] || new Orbiter(o.center);
  let orbiter = objects[o.orbiter] || new Orbiter(o.orbiter);
  orbiter.setParent(parent);

  objects[o.center] = parent;
  objects[o.orbiter] = orbiter;
});

const result = Object.keys(objects)
  .map(k => {
    const orbits = objects[k].getOrbits();
    return orbits;
  })
  .reduce((sum, o) => sum + o, 0);
console.log("Part1: ", result);
const you = objects.YOU.getParentList();
const santa = objects.SAN.getParentList();

while (you[0] === santa[0]) {
  you.splice(0, 1);
  santa.splice(0, 1);
}

console.log("Part2: ", you.length + santa.length);
