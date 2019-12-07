const { run, parseFile } = require("./program");

const program = parseFile("d7.txt");

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

const amp = (phase, input) => run(program, [phase, input]);

while (a <= 4) {
  const result = amp(e, amp(d, amp(c, amp(b, amp(a, 0)))));
  max = max > result ? max : result;

  moveNextInput();
}

console.log(max);
