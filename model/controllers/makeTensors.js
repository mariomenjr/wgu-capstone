const tf = require("@tensorflow/tfjs-node");
const { CountWeekDays } = require("../config/config");
const Enums = require("../config/enums");

module.exports = (props) => (rows) => {
  /*
    What do I need to make this work?

    - [x] Clean data
    - [x] All Xs? Volume and Day of Week
    - [ ] Convert data into tensors
    - [ ] 
  
  */
  console.debug(`Making tensors for ${rows.length} records!`);

  const length = CountWeekDays;
  const domainMatrix = Array.from({ length }, () => []);
  const rangeMatrix = Array.from({ length }, () => []);

  for (const row of rows) {
    const y = row[Enums.Columns.Weekday];

    rangeMatrix[y].push(y);
    domainMatrix[y].push([
      row[Enums.Columns.Close] - row[Enums.Columns.Open],
      row[Enums.Columns.Volume],
    ]);
  }

  console.debug({ domainMatrix, rangeMatrix });
};
