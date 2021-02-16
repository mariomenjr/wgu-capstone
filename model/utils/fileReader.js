const fs = require("fs");
const csv = require("csv");

module.exports = async function (filePath) {
  const data = [];
  const file = fs.createReadStream(filePath)
  const parser = csv.parse({ columns: false, fromLine: 2 });

  file.pipe(parser);

  for await (const line of parser) data.push(line);

  return data;
};
