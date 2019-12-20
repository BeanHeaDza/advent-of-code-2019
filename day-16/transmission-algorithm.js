function transmissionAlgorithm(number) {
  const parts = ("" + number).split("").map(x => +x);
  let output = "";

  for (let position = 0; position < parts.length; position++) {
    const jumpSize = position + 1;
    let x = position,
      sum = 0;
    while (x < parts.length) {
      let end = x + position;
      for (; x <= end && x < parts.length; x++) {
        sum += parts[x];
      }
      x += jumpSize;

      end = x + position;
      for (; x <= end && x < parts.length; x++) {
        sum -= parts[x];
      }
      x += jumpSize;
    }

    sum = "" + sum;
    output += sum.substr(sum.length - 1);
  }

  return output;
}

function transmissionAlgorithmMultiple(number, times, cutOff = 8) {
  for (let x = 0; x < times; x++) {
    number = transmissionAlgorithm(number);
  }
  return number.substr(0, cutOff);
}

module.exports = {
  transmissionAlgorithm,
  transmissionAlgorithmMultiple
};
