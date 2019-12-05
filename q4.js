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

function isValidPart2(password) {
  const passTxt = "" + password;
  if (passTxt[0] == passTxt[1] && passTxt[1] !== passTxt[2]) {
  } else if (passTxt[4] === passTxt[5] && passTxt[3] !== passTxt[4]) {
  } else {
    let match = false;
    for (let i = 1; i < 4; i++) {
      if (
        passTxt[i - 1] !== passTxt[i] &&
        passTxt[i] === passTxt[i + 1] &&
        passTxt[i + 1] !== passTxt[i + 2]
      ) {
        match = true;
        break;
      }
    }
    if (!match) {
      return false;
    }
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

function part2() {
  let count = 0;
  for (let pass = 171309; pass <= 643603; pass++) {
    if (isValidPart2(pass)) {
      count += 1;
    }
  }

  console.log("Part2:", count);
}
part1();
part2();

module.exports = {
  isValid,
  isValidPart2
};
