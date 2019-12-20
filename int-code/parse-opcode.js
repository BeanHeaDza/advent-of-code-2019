const parseOpcode = instruction => {
  const s = "" + instruction;
  if (s.length <= 2) {
    return {
      code: instruction,
      parameterModes: ["ref", "ref", "ref"]
    };
  }

  parameterModes = s
    .substr(0, s.length - 2)
    .split("")
    .map(c => {
      switch (c) {
        case "0":
          return "ref";
        case "1":
          return "value";
        case "2":
          return "relative";

        default:
          throw "unknown param mode: " + c;
      }
    })
    .reverse();

  while (parameterModes.length < 3) {
    parameterModes.push("ref");
  }

  return {
    code: +s.substr(s.length - 2),
    parameterModes
  };
};

module.exports = parseOpcode;
