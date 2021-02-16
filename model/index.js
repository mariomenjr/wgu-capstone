const tf = require("@tensorflow/tfjs-node");

const fileReader = require("./utils/fileReader");
const processData = require("./controllers/processData");
const makeTensors = require("./controllers/makeTensors");

let isPromiseResolved = false;

Promise.all(
  [
    `data/bitcoin_cash_price.csv`,
    `data/bitcoin_price.csv`,
    `data/bitconnect_price.csv`,
    `data/dash_price.csv`,
    `data/ethereum_classic_price.csv`,
    `data/ethereum_price.csv`,
    `data/iota_price.csv`,
    `data/litecoin_price.csv`,
    `data/monero_price.csv`,
    `data/nem_price.csv`,
    `data/neo_price.csv`,
    `data/numeraire_price.csv`,
    `data/omisego_price.csv`,
    `data/qtum_price.csv`,
    `data/ripple_price.csv`,
    `data/stratis_price.csv`,
    `data/waves_price.csv`,
  ].map((filePath) => fileReader(filePath))
)
  .then(processData())
  .then(makeTensors())
  .catch((e) => console.error({ e }))
  .finally(() => {
    isPromiseResolved = true;
  });

function wait() {
  if (!isPromiseResolved) setTimeout(wait, 1000);
}

wait();
