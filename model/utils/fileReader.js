const fs = require("fs");
const csv = require("csv");

async function load(fileObj) {
  const data = [];
  const file = fs.createReadStream(fileObj.path)
  const parser = csv.parse({ columns: false, fromLine: 2 });

  file.pipe(parser);
  
  for await (const line of parser) data.push([...line, fileObj.category]);

  return data;
};

module.exports = { load };