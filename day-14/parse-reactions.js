const parseReactions = content =>
  content.split("\n").map(line => {
    const parts = line.split(" => ");
    const sources = parts[0].split(",");

    const mapReaction = rawString => {
      const match = rawString.match(/(\d+) (\w+)/);
      return {
        quantity: +match[1],
        name: match[2]
      };
    };

    const output = mapReaction(parts[1]);
    const input = sources.map(s => mapReaction(s));

    return { input, output };
  });
module.exports = parseReactions;
