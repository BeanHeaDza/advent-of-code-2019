module.exports = function(instructions, noun, verb) {
  let currentIndex = 0;
  // Don't mutate the input
  instructions = [...instructions];
  instructions[1] = noun;
  instructions[2] = verb;

  while (instructions[currentIndex] !== 99) {
    const a = instructions[currentIndex + 1];
    const b = instructions[currentIndex + 2];
    const c = instructions[currentIndex + 3];
    switch (instructions[currentIndex]) {
      case 1:
        instructions[c] = instructions[a] + instructions[b];
        break;
      case 2:
        instructions[c] = instructions[a] * instructions[b];
        break;
      default:
        throw "Unexpected opt code: " + instructions[currentIndex];
    }
    currentIndex += 4;
  }
  return instructions[0];
};
