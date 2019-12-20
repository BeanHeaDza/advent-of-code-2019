module.exports = function(program, outputIndex) {
  const memory = program.memory;
  const input = () => {
    const [next] = program.input.splice(0, 1);
    memory[outputIndex] = next;
    program.currentIndex += 2;
    return program;
  };

  if (program.input && program.input.length) {
    return input();
  } else {
    return input;
  }
};
