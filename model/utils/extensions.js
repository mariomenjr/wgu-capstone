/**
   * @link https://stackoverflow.com/a/6117889/3135446
   *
   */
function getWeekNumber() {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() + 1;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

function extend() {
  Date.prototype.getWeekNumber = getWeekNumber;
};

module.exports = { extend, getWeekNumber };