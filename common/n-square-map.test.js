const nSquareMap = require("./n-square-map");

describe("nSquareMap", () => {
  it("should map correctly", () => {
    const input = [1, 2, 3];
    const expected = [
      { a: 1, b: 2 },
      { a: 1, b: 3 },
      { a: 2, b: 1 },
      { a: 2, b: 3 },
      { a: 3, b: 1 },
      { a: 3, b: 2 }
    ];

    expect(nSquareMap(input)).toEqual(expected);
  });
});
