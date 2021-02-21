const WeekDays = [
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];

const PriceCollection = [
  { path: `data/bitcoin_cash_price.csv`, category: 0, symbol: `bch`, data: [] },
  { path: `data/bitcoin_price.csv`, category: 1, symbol: `btc`, data: [] },
  { path: `data/bitconnect_price.csv`, category: 2, symbol: `bcc`, data: [] },
  { path: `data/dash_price.csv`, category: 3, symbol: `dash`, data: [] },
  { path: `data/ethereum_classic_price.csv`, category: 4, symbol: `etc`, data: [] },
  { path: `data/ethereum_price.csv`, category: 5, symbol: `eth`, data: [] },
  { path: `data/iota_price.csv`, category: 6, symbol: `iota`, data: [] },
  { path: `data/litecoin_price.csv`, category: 7, symbol: `ltc`, data: [] },
  { path: `data/monero_price.csv`, category: 8, symbol: `xmr`, data: [] },
  { path: `data/nem_price.csv`, category: 9, symbol: `nem`, data: [] },
  { path: `data/neo_price.csv`, category: 10, symbol: `nem`, data: [] },
  { path: `data/numeraire_price.csv`, category: 11, symbol: `nmr`, data: [] },
  { path: `data/omisego_price.csv`, category: 12, symbol: `omg`, data: [] },
  { path: `data/qtum_price.csv`, category: 13, symbol: `qtum`, data: [] },
  { path: `data/ripple_price.csv`, category: 14, symbol: `xrp`, data: [] },
];

module.exports = {
  WeekDays,
  PriceCollection,
};
