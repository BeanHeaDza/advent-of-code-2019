module.exports = function(program, index) {
  if (typeof program.output !== "function") {
    throw "Program needs a property with the name output that is a function";
  }
  program.output(program.memory[index] || 0);
  program.currentIndex += 2;
  return program;
};
