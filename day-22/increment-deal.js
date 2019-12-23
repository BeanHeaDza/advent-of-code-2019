module.exports = function(cards, increment) {
  const newCards = [];
  let index = 0;
  for (let x = 0; x < cards.length; x++) {
    newCards[index] = cards[x];
    index = (index + increment) % cards.length;
  }
  return newCards;
};
