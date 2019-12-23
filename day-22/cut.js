module.exports = function(cards, length) {
  if (length < 0) {
    return [...cards.slice(length), ...cards.slice(0, cards.length + length)];
  } else {
    return [...cards.slice(length), ...cards.slice(0, length)];
  }
};
