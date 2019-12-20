const getParam = (instructions, mode, currentIndex, relativeBase) => {
  switch (mode) {
    case "value":
      return currentIndex;
    case "ref":
      return instructions[currentIndex];
    case "relative":
      return relativeBase + instructions[currentIndex];

    default:
      throw "Unknown param mode: " + mode;
  }
};

function initGetParam(program, opcode) {
  return index => {
    const currentIndex = program.currentIndex + index + 1;
    const mode = opcode.parameterModes[index];
    switch (mode) {
      case "value":
        return currentIndex;
      case "ref":
        return program.memory[currentIndex];
      case "relative":
        return program.relativeBase + program.memory[currentIndex];

      default:
        throw "Unknown param mode: " + mode;
    }
  };
}

module.exports = { getParam, initGetParam };
