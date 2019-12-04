const { isValid } = require("./q4");

describe("isValid", () => {
  it("should be valid for 111111", () => {
    expect(isValid(111111)).toBe(true);
  });

  it("should be invalid for 223450", () => {
    expect(isValid(223450)).toBe(false);
  });

  it("should be invalid for 123789", () => {
    expect(isValid(123789)).toBe(false);
  });

  it("should be valid for 177778", () => {
    expect(isValid(177778)).toBe(true);
  });
});
