const { compile } = require("./program");
const { EMPTY } = require("rxjs");

describe("d9", () => {
  it("takes no input and produces a copy of itself as output", done => {
    const input = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99".split(
      ","
    );
    const pgm = compile(input, EMPTY);
    const output = [];
    const expected = input.map(i => +i);

    pgm.subscribe(
      o => output.push(o),
      e => done.fail(e),
      () => {
        expect(output).toEqual(expected);
        done();
      }
    );
  });

  it("should output a 16-digit number", done => {
    const pgm = compile("1102,34915192,34915192,7,4,7,99,0".split(","), EMPTY);
    pgm.subscribe(o => {
      expect(("" + o).length).toBe(16);
      done();
    });
  });

  it("should output the large number in the middle", done => {
    const pgm = compile("104,1125899906842624,99".split(","), EMPTY);
    pgm.subscribe(o => {
      expect(o).toBe(1125899906842624);
      done();
    });
  });
});
