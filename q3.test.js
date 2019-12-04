const { readPaths, getIntersect } = require("./q3");

describe("getIntersect", () => {
  it("should find a normal intersection", () => {
    const intersect = getIntersect(
      {
        start: { x: 0, y: 0 },
        end: { x: 32, y: 32 }
      },
      {
        start: { x: 0, y: 20 },
        end: { x: 20, y: 0 }
      }
    );

    expect(intersect).toEqual({ x: 10, y: 10 });
  });

  it("should get an intersect that is on a y axis line", () => {
    const intersect = getIntersect(
      {
        start: { x: -5, y: 0 },
        end: { x: 15, y: 20 }
      },
      {
        start: { x: 5, y: -5 },
        end: { x: 5, y: 25 }
      }
    );

    expect(intersect).toEqual({ x: 5, y: 10 });
  });

  it("should get an intersect that is on a x axis line", () => {
    const intersect = getIntersect(
      {
        start: { x: -5, y: 10 },
        end: { x: 46, y: 10 }
      },
      {
        start: { x: 0, y: 0 },
        end: { x: 20, y: 20 }
      }
    );

    expect(intersect).toEqual({ x: 10, y: 10 });
  });

  it("should get an intersect that is just just touching", () => {
    const intersect = getIntersect(
      {
        start: { x: -5, y: 10 },
        end: { x: 46, y: 10 }
      },
      {
        start: { x: 10, y: 10 },
        end: { x: 20, y: 20 }
      }
    );

    expect(intersect).toEqual({ x: 10, y: 10 });
  });

  it("should not intersect for 0,0->990,0 to 15,1140=>15,2127", () => {
    const intersect = getIntersect(
      {
        start: { x: 0, y: 0 },
        end: { x: 990, y: 0 }
      },
      {
        start: { x: 15, y: 1140 },
        end: { x: 15, y: 2127 }
      }
    );
    expect(intersect).toBeFalsy();
  });
});

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
