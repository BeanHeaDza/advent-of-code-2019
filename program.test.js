const { compile } = require("./program");
const { Subject, ReplaySubject } = require("rxjs");

describe("compile", () => {
  it("should follow observables", done => {
    const input = new Subject();
    compile([3, 0, 4, 0, 99], input).subscribe(o => {
      expect(o).toBe(222);
      done();
    });
    input.next(222);
  });

  it("should work with replay subjects", done => {
    const input = new ReplaySubject();
    input.next(111);
    input.next(222);
    const output = [];
    const d = () => {
      expect(output).toEqual([111, 222]);
      done();
    };
    compile([3, 0, 3, 1, 4, 0, 4, 1, 99], input).subscribe(
      o => output.push(o),
      e => done.fail(e),
      d
    );
  });

  fit("should work with delayed input", () => {
    const input = new Subject();
    const output = [];
    const d = () => {
      expect(output).toEqual([111, 222]);
      done();
    };
    compile([3, 0, 4, 0, 3, 1, 4, 1, 99], input).subscribe(o => {
      output.push(o);
    });
    input.next(111);
    expect(output).toEqual([111]);
    input.next(222);
    expect(output).toEqual([111, 222]);
  });
});
