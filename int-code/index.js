const fs = require("fs");

const parseContent = content => content.split(/,/g).map(x => +x);
const parseFile = path =>
  parseContent(fs.readFileSync(path, { encoding: "utf8" }));

module.exports = {
  parseContent,
  parseFile
};
