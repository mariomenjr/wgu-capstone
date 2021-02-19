const Enums = require(`../config/enums`);

function withParsers() {
  const setWeekday = (_, row) => new Date(row[Enums.Columns.Date]).getDay();
  const enforceNumbers = (fieldValue) => {
    const number = Number(`${fieldValue}`.replace(/\,/g, ``));
    return isNaN(number) ? null : number;
  };

  return {
    [Enums.Columns.Date]: (fieldValue) => fieldValue,
    [Enums.Columns.Open]: enforceNumbers,
    [Enums.Columns.High]: enforceNumbers,
    [Enums.Columns.Low]: enforceNumbers,
    [Enums.Columns.Close]: enforceNumbers,
    [Enums.Columns.Volume]: enforceNumbers,
    [Enums.Columns.MarketCap]: enforceNumbers,
    [Enums.Columns.Weekday]: setWeekday
  };
}

module.exports = withParsers;