const { readFile, readContent } = require("../common");
const cut = require("./cut");
const incrementDeal = require("./increment-deal");

const lines = readFile("day-22/input.txt", "lines");

let cards = [...new Array(10007)].map((_, i) => i);
lines.forEach(line => {
  if (line === "deal into new stack") {
    cards = cards.reverse();
  } else if (line.startsWith("cut ")) {
    const length = +line.split(" ")[1];
    cards = cut(cards, length);
  } else if (line.startsWith("deal with increment ")) {
    const increment = +line.split(" ")[3];
    cards = incrementDeal(cards, increment);
  }
});

console.log("Part1:", cards.indexOf(2019));
