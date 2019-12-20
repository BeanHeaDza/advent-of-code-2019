function factorial(num) {
  if (num < 1 || Math.floor(num) !== num) {
    throw "factorial can only be calculated on positive whole numbers";
  }
  return num === 1 ? 1 : num * factorial(num - 1);
}

function combinationsGenerator(inputArr, r) {
  let result = [];

  const combine = (arr, m = []) => {
    if (m.length === r) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        combine(arr.slice(i + 1), m.concat(arr.slice(i, i + 1)));
      }
    }
  };

  combine(inputArr);

  return result;
}

function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

module.exports = {
  combinations,
  combinationsGenerator
};

const input = "ABCDE".split("");
combinationsGenerator(input, 3);
