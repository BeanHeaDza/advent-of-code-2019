const { parseFile, compile } = require("../int-code");
const { Subject } = require("rxjs");

const instructions = parseFile("day-21/input.txt");
const input = new Subject();
let jumpScript = `NOT C J
AND D J
NOT A T
OR T J
WALK
`;
const awaitingInput = () => {
  const next = jumpScript.substr(0, 1);
  jumpScript = jumpScript.substr(1);
  input.next(next.charCodeAt(0));
};
const pgm = compile(instructions, input, awaitingInput);

let output = "";
let answer;
pgm.subscribe(o => {
  if (o > 127) {
    answer = o;
  } else {
    const c = String.fromCharCode(o);
    if (c == "\n") {
      console.log(output);
      output = "";
    } else {
      output += c;
    }
  }
});
console.log("Part1:", answer);
