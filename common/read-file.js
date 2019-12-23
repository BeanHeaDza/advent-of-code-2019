const fs = require("fs");

function readContent(content, method) {
  if (method === "map") {
    return content.split("\n").map(line => line.split(""));
  } else if (method === "lines") {
    return content.split("\n");
  }
  return content;
}

function readFile(path, method) {
  const content = fs.readFileSync(path, { encoding: "utf8" });
  return readContent(content, method);
}

module.exports = { readContent, readFile };
