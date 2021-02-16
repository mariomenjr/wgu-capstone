const Enum = require(`../config`);

function withParsers() {
  const setWeekday = (_, row) => new Date(row[Enum.Columns.Date]).getDay();
  const enforceNumbers = (fieldValue) => {
    const number = Number(`${fieldValue}`.replace(/\,/g, ``));
    return isNaN(number) ? null : number;
  };

  return {
    [Enum.Columns.Date]: (fieldValue) => fieldValue,
    [Enum.Columns.Open]: enforceNumbers,
    [Enum.Columns.High]: enforceNumbers,
    [Enum.Columns.Low]: enforceNumbers,
    [Enum.Columns.Close]: enforceNumbers,
    [Enum.Columns.Volume]: enforceNumbers,
    [Enum.Columns.MarketCap]: enforceNumbers,
    [Enum.Columns.Weekday]: setWeekday
  };
}

module.exports = withParsers;