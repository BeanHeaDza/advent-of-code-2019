const { compile, parseFile } = require("./program");
const { ReplaySubject } = require("rxjs");

const instructions = parseFile("d7.txt");

let a = 0,
  b = 0,
  c = 0,
  d = 0,
  e = 0;

const isValidInput = () => {
  return (
    a != b &&
    a != c &&
    a != d &&
    a != e &&
    b != c &&
    b != d &&
    b != e &&
    c != d &&
    c != e &&
    d != e
  );
};

const moveNextInput = () => {
  do {
    if (b === 4 && c === 4 && d === 4 && e === 4) {
      a += 1;
      b = 0;
      c = 0;
      d = 0;
      e = 0;
    } else if (c === 4 && d === 4 && e === 4) {
      b += 1;
      c = 0;
      d = 0;
      e = 0;
    } else if (d === 4 && e === 4) {
      c += 1;
      d = 0;
      e = 0;
    } else if (e === 4) {
      d += 1;
      e = 0;
    } else {
      e += 1;
    }
  } while (!isValidInput());
};

let max = 0;
moveNextInput();

while (a <= 4) {
  const iA = new ReplaySubject();
  iA.next(a);
  const pA = compile(instructions, iA);

  const iB = new ReplaySubject();
  iB.next(b);
  const pB = compile(instructions, iB);

  const iC = new ReplaySubject();
  iC.next(c);
  const pC = compile(instructions, iC);

  const iD = new ReplaySubject();
  iD.next(d);
  const pD = compile(instructions, iD);

  const iE = new ReplaySubject();
  iE.next(e);
  const pE = compile(instructions, iE);

  iA.next(0);
  pA.subscribe(o => iB.next(o));
  pB.subscribe(o => iC.next(o));
  pC.subscribe(o => iD.next(o));
  pD.subscribe(o => iE.next(o));
  pE.subscribe(o => (max = max > o ? max : o));

  moveNextInput();
}
setTimeout(() => console.log(max));
