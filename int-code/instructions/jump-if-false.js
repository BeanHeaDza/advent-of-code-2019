module.exports = function(program, inputIndex, destinationIndex) {
  if ((program.memory[inputIndex] || 0) === 0) {
    program.currentIndex = program.memory[destinationIndex] || 0;
  } else {
    program.currentIndex += 3;
  }
  return program;
};
