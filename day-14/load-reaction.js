const loadReaction = (chemical, requiredQuantity, allReactions, chemicals) => {
  const { input, output } = allReactions.find(r => r.output.name === chemical);
  const multiplier = Math.ceil(requiredQuantity / output.quantity);

  input.forEach(({ name, quantity }) => {
    chemicals[name] = (chemicals[name] || 0) - quantity * multiplier;
  });

  chemicals[output.name] =
    (chemicals[output.name] || 0) + output.quantity * multiplier;
};

module.exports = loadReaction;
