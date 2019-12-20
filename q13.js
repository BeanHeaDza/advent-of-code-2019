const { compile, parseFile } = require("./int-code");
const { Subject } = require("rxjs");
const { bufferCount } = require("rxjs/operators");

const input = new Subject();
const pgm = compile(parseFile("d13.txt"), input);

let count = 0;

pgm.pipe(bufferCount(3)).subscribe(
  ([x, y, tile]) => {
    if (tile === 2) {
      count++;
    }
  },
  () => {},
  () => {
    console.log(count);
  }
);
