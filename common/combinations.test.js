const { combinations, combinationsGenerator } = require("./combinations");

describe("combinations", () => {
  it("should calculate correctly", () => {
    expect(combinations(5, 3)).toEqual(10);
  });
});

describe("combinationsGenerator", () => {
  it("#1", () => {
    const input = "ABCDE".split("");
    const expected = "ABC ABD ABE ACD ACE ADE BCD BCE BDE CDE";
    const result = combinationsGenerator(input, 3)
      .map(line => line.join(""))
      .join(" ");
    expect(result).toEqual(expected);
  });

  it("#2", () => {
    const input = "ABCDEFG".split("");
    const expected =
      "ABCD ABCE ABCF ABCG ABDE ABDF ABDG ABEF ABEG ABFG ACDE ACDF ACDG ACEF ACEG ACFG ADEF ADEG ADFG AEFG BCDE BCDF BCDG BCEF BCEG BCFG BDEF BDEG BDFG BEFG CDEF CDEG CDFG CEFG DEFG";
    const result = combinationsGenerator(input, 4)
      .map(line => line.join(""))
      .join(" ");
    expect(result).toEqual(expected);
  });
});
