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

module.exports = isValid;
