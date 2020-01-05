const { parseFile, compile } = require("../int-code");
const { Subject } = require("rxjs");
const readline = require("readline");

const instructions = parseFile("day-25/input.txt");
const input = new Subject();
let inputString = "";
const awaitingInput = () => {
  if (inputString.length) {
    const next = inputString.charCodeAt(0);
    inputString = inputString.substr(1);
    input.next(next);
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.once("line", answer => {
      inputString = answer.substr(1) + "\n";
      rl.close();
      input.next(answer.charCodeAt(0));
    });
  }
};

const pgm = compile(instructions, input, awaitingInput);
let screen = "";
pgm.subscribe(o => {
  const c = String.fromCharCode(o);
  if (c === "\n") {
    console.log(screen);
    screen = "";
  } else {
    screen += c;
  }
});
