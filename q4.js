function isValid(password) {
  const passTxt = "" + password;
  if (!/(\d)\1/.test(passTxt)) {
    return false;
  }
  for (let x = 1; x < passTxt.length; x++) {
    if (passTxt[x] < passTxt[x - 1]) {
      return false;
    }
  }
  return true;
}

function part1() {
  let count = 0;
  for (let pass = 171309; pass <= 643603; pass++) {
    if (isValid(pass)) {
      count += 1;
    }
  }

  console.log("Part1:", count);
}
part1();

module.exports = {
  isValid
};
