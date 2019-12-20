const fs = require("fs");

function findLastIndex(array, f) {
  var index = array
    .slice()
    .reverse()
    .findIndex(f);
  var count = array.length - 1;
  var finalIndex = index >= 0 ? count - index : index;
  return finalIndex;
}

it("", () => {
  const lines = fs
    .readFileSync("day-19/part2.test.txt", { encoding: "utf8" })
    .split("\n");

  function solved() {
    let y = map.length - 10;
    let top = map[y];
    let bottom = map[map.length - 1];
    if (top && top.end - 9 >= bottom.start) {
      expect(bottom.start * 10000 + y).toBe(250020);
      return true;
    }
    return false;
  }

  const map = [];

  let isSolved = false;
  while (lines.length && !isSolved) {
    const [line] = lines.splice(0, 1);
    const search = c => c == "#" || c == "O";
    const start = line.split("").findIndex(search);
    const end = findLastIndex(line.split(""), search);
    map.push({ start, end });
    isSolved = solved();
  }
  expect(isSolved).toBe(true);
});
