const readPaths = require("./read-paths");

describe("readPaths", () => {
  it("should go back to origin in a loop", () => {
    expect(readPaths("U10,R10,D10,L10")).toEqual([
      {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 10 },
        prevStepSum: 0
      },
      {
        start: { x: 0, y: 10 },
        end: { x: 10, y: 10 },
        prevStepSum: 10
      },
      {
        start: { x: 10, y: 10 },
        end: { x: 10, y: 0 },
        prevStepSum: 20
      },
      {
        start: { x: 10, y: 0 },
        end: { x: 0, y: 0 },
        prevStepSum: 30
      }
    ]);
  });
});
