const { from } = require("rxjs");
const { parseFile, compile } = require("../int-code");

const instructions = parseFile("day-19/input.txt");

let result = 0;
let print = "";
let x = 0;
let y = 0;

function scan() {
  const pgm = compile(instructions, from([x, y]));
  pgm.subscribe(
    o => {
      print += o ? "#" : ".";
      result += o;
    },
    e => {
      throw e;
    },
    () => {
      process.nextTick(() => {
        x++;
        if (x == 50) {
          console.log(print);
          print = "";
          x = 0;
          y++;
        }
        if (y == 50) {
          console.log("Part1:", result);
        } else {
          scan();
        }
      });
    }
  );
}

scan();
