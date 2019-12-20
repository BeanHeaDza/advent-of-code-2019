const {
  transmissionAlgorithm,
  transmissionAlgorithmMultiple
} = require("./transmission-algorithm");

describe("transmissionAlgorithm", () => {
  it("#1", () => {
    expect(transmissionAlgorithm("12345678")).toEqual("48226158");
  });

  it("#2", () => {
    expect(
      transmissionAlgorithmMultiple("80871224585914546619083218645595", 100)
    ).toEqual("24176176");
  });
});
