const { of } = require("rxjs");
const { compile } = require("../int-code");
const runTestData = require("./q5.test.json");

describe("run", () => {
  const jumpInput = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];

  it("should return 999 for input of 7", () => {
    let output;
    compile(runTestData, of(7)).subscribe(o => (output = o));
    expect(output).toBe(999);
  });
  it("should return 1000 for input of 8", () => {
    let output;
    compile(runTestData, of(8)).subscribe(o => (output = o));
    expect(output).toBe(1000);
  });
  it("should return 1001 for input of 9", () => {
    let output;
    compile(runTestData, of(9)).subscribe(o => (output = o));
    expect(output).toBe(1001);
  });

  it("jump test 1", () => {
    let output;
    compile(jumpInput, of(0)).subscribe(o => (output = o));
    expect(output).toBe(0);
  });

  it("jump test 2", () => {
    let output;
    compile(jumpInput, of(8)).subscribe(o => (output = o));
    expect(output).toBe(1);
  });
});
