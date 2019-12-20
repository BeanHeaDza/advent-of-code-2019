module.exports = function(program, index) {
  program.relativeBase += program.memory[index] || 0;
  program.currentIndex += 2;
  return program;
};
