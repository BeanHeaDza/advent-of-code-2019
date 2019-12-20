const parseOpcode = require("./parse-opcode");

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
