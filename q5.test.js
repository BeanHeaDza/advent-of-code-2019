const { parseOpcode, run } = require("./q5");
const runTestData = require("./q5.test.json");

describe("parseOpcode", () => {
  it("no params", () => {
    expect(parseOpcode(99)).toEqual({
      code: 99,
      parameterModes: ["ref", "ref", "ref"]
    });
  });

  it("params with refs", () => {
    expect(parseOpcode(1002)).toEqual({
      code: 2,
      parameterModes: ["ref", "value", "ref"]
    });
  });

  it("should work for 1101", () => {
    expect(parseOpcode(1101)).toEqual({
      code: 1,
      parameterModes: ["value", "value", "ref"]
    });
  });

  it("should work for 1008", () => {
    expect(parseOpcode(1008)).toEqual({
      code: 8,
      parameterModes: ["ref", "value", "ref"]
    });
  });
});

describe("run", () => {
  const jumpInput = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];

  it("should return 999 for input of 7", () => {
    expect(run(runTestData, 7)).toBe(999);
  });

  it("should return 1000 for input of 8", () => {
    expect(run(runTestData, 8)).toBe(1000);
  });

  it("should return 1001 for input of 9", () => {
    expect(run(runTestData, 9)).toBe(1001);
  });

  it("jump test 1", () => {
    expect(run(jumpInput, 0)).toBe(0);
  });

  it("jump test 2", () => {
    expect(run(jumpInput, 8)).toBe(1);
  });
});
