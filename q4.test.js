const { isValid, isValidPart2 } = require("./q4");

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

describe("isValidPart2", () => {
  it("should be valid for 112233", () => {
    expect(isValidPart2(112233)).toBe(true);
  });
  it("should be invalid for 123444", () => {
    expect(isValidPart2(123444)).toBe(false);
  });
  it("should be valid for 111122", () => {
    expect(isValidPart2(111122)).toBe(true);
  });
});
