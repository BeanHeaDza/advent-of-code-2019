const fs = require("fs");

function readContent(content, method) {
  if (method === "map") {
    return content.split("\n").map(line => line.split(""));
  }
  return content;
}

function readFile(path, method) {
  const content = fs.readFileSync(path, { encoding: "utf8" });
  return readContent(content, method);
}

module.exports = { readContent, readFile };
