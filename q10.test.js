const {
  getAstroidPoints,
  getPointViews,
  getMaxViews,
  getMaxViewsPart2
} = require("./q10");

describe("getAstroidPoints", () => {
  it("should parse correctly", () => {
    const input = ".#..#\n.....\r\n....#\n....#\n...#.";
    const expected = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 }
    ];

    expect(getAstroidPoints(input)).toEqual(expected);
  });
});

describe("getPointViews", () => {
  it("should match #1", () => {
    const input = `.#..#
.....
#####
....#
...##`;
    expect(getPointViews(getAstroidPoints(input), 2)).toEqual(6);
  });
});

describe("getMaxViews", () => {
  it("should be correct", () => {
    const input = `.#..#
.....
#####
....#
...##`;
    expect(getMaxViews(getAstroidPoints(input))).toEqual(8);
  });
});

describe("Part 2", () => {
  it("1", () => {
    const input = getAstroidPoints(`.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##`);

    expect(getMaxViewsPart2(input, 9)).toEqual({
      visibility: 30,
      destroyedIndex: 1501
    });
  });

  it("2", () => {
    const input = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

    expect(getMaxViewsPart2(getAstroidPoints(input), 200)).toEqual({
      visibility: 210,
      destroyedIndex: 802
    });
  });
});
