const { compile, parseFile } = require("./int-code");
const { ReplaySubject } = require("rxjs");

const instructions = parseFile("d7.txt");

let a = 5,
  b = 5,
  c = 5,
  d = 5,
  e = 5;

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
    if (b === 9 && c === 9 && d === 9 && e === 9) {
      a += 1;
      b = 5;
      c = 5;
      d = 5;
      e = 5;
    } else if (c === 9 && d === 9 && e === 9) {
      b += 1;
      c = 5;
      d = 5;
      e = 5;
    } else if (d === 9 && e === 9) {
      c += 1;
      d = 5;
      e = 5;
    } else if (e === 9) {
      d += 1;
      e = 5;
    } else {
      e += 1;
    }
  } while (!isValidInput());
};

let max = 0;
moveNextInput();

while (a <= 9) {
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

  let lastOutput = undefined;
  iA.next(0);
  pA.subscribe(o => iB.next(o));
  pB.subscribe(o => iC.next(o));
  pC.subscribe(o => iD.next(o));
  pD.subscribe(o => iE.next(o));
  pE.subscribe(
    o => {
      iA.next(o);
      lastOutput = o;
    },
    () => {},
    () => (max = max < lastOutput ? lastOutput : max)
  );

  moveNextInput();
}
setTimeout(() => console.log(max));
