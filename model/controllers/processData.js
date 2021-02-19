const Enums = require(`../config/enums`);
const withParsers = require(`../utils/withParsers`);

function processRow({ withParsers }) {
  const columnParsers = withParsers();

  return function (row) {
    const length = Object.keys(Enums.Columns).length;
    const newRow = Array.from({ length }, () => null);

    return newRow.map((_, i) => columnParsers[i](row[i], row));
  };
}

module.exports = (_) => (rows) =>
  rows
    .reduce((a, c) => a.concat(c), [])
    .map(processRow({ withParsers }))
    .filter((row) => !row.some((field) => field === null));
