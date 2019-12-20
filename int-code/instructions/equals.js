module.exports = function(program, aIndex, bIndex, outputIndex) {
  program.memory[outputIndex] =
    (program.memory[aIndex] || 0) === (program.memory[bIndex] || 0) ? 1 : 0;
  program.currentIndex += 4;
  return program;
};
