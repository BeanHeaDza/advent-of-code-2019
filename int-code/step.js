const parseOpcode = require("./parse-opcode");
const { initGetParam } = require("./get-param");
const instructions = require("./instructions");

function step(program) {
  const opcode = parseOpcode(program.memory[program.currentIndex]);
  const getParam = initGetParam(program, opcode);

  const a = getParam(0);
  const b = getParam(1);
  const c = getParam(2);
  switch (opcode.code) {
    case 1:
      return instructions.addition(program, a, b, c);
    case 2:
      return instructions.multiplication(program, a, b, c);
    case 3:
      return instructions.input(program, a);
    case 4:
      return instructions.output(program, a);
    case 5:
      return instructions.jumpIfTrue(program, a, b);
    case 6:
      return instructions.jumpIfFalse(program, a, b);
    case 7:
      return instructions.lessThan(program, a, b, c);
    case 8:
      return instructions.equals(program, a, b, c);
    case 9:
      return instructions.adjustRelativeBase(program, a);
    case 99:
      return null;
    default:
      throw "Unexpected opt code: " + opcode.code;
  }
}

module.exports = step;
