const { Observable } = require("rxjs");
const step = require("./step");

function compile(instructions, input$, awaitingInput = () => {}) {
  return new Observable(subscribe => {
    const program = {
      memory: instructions.map(x => +x),
      currentIndex: 0,
      relativeBase: 0,
      input: [],
      output: o => subscribe.next(o)
    };
    let inputCallback;

    const run = () => {
      do {
        const result = step(program);
        const type = typeof result;

        if (!result) {
          subscribe.complete();
          break;
        } else if (type === "function") {
          inputCallback = result;
          awaitingInput();
          break;
        }
      } while (true);
    };
    let subscription;
    if (input$ instanceof Observable) {
      subscription = input$.subscribe(i => {
        program.input.push(i);
        if (inputCallback) {
          inputCallback();
          inputCallback = null;
          run();
        }
      });
    }

    run();
    return subscription;
  });
}

module.exports = compile;
