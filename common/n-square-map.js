module.exports = function(arr) {
  return arr
    .map((a, aIndex) =>
      arr.filter((_, bIndex) => aIndex !== bIndex).map(b => ({ a, b }))
    )
    .flatMap(x => x);
};
