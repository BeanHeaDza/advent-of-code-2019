const { compile, parseFile } = require("./int-code");
const { Subject } = require("rxjs");

const instructions = parseFile("d9.txt");

const i$ = new Subject();
const pgm1 = compile(instructions, i$);

pgm1.subscribe(o => console.log("Part1: ", o));
i$.next(1);

pgm1.subscribe(o => console.log("Part2: ", o));
i$.next(2);
