const { parseFile, compile } = require("../int-code");
const { Subject } = require("rxjs");

const instructions = parseFile("day-17/input.txt");
instructions[0] = 2;
const input = new Subject();

let i = `C,B,B,C,A,C,A,C,A,B
R,12,L,12,L,4,L,4
R,8,R,12,L,12
L,6,R,12,R,8
n
`;
let mapString = "";
let answer;
const awaitingInput = () => {
  setTimeout(() => {
    if (mapString && mapString.substr(mapString.length - 1, 1) === "\n") {
      console.log(mapString);
      mapString = "";
    }
    mapString += i[0];
    let current = i.charCodeAt(0);
    i = i.substr(1);
    if (current) {
      input.next(current);
    }
  });
};
const pgm = compile(instructions, input, awaitingInput);
pgm.subscribe(
  output => {
    if (output < 128) mapString += String.fromCharCode(output);
    else answer = output;
  },
  e => {
    throw e;
  },
  () => {
    if (mapString) {
      console.log(mapString);
      mapString = "";
    }
    console.log("Part2:", answer);
  }
);
