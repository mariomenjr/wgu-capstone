const tf = require("@tensorflow/tfjs-node");
const fileReader = require("./fileReader");

let isPromiseResolved = false;

Promise.all(
  [
    `data/bitcoin_price.csv`,
    `data/ethereum_price.csv`,
    `data/litecoin_price.csv`,
  ].map((filePath) => fileReader(filePath))
)
  .then((r) => {
    console.debug({ r });
  })
  .catch((e) => {
    console.error({ e });
  })
  .finally(() => {
    isPromiseResolved = true;
  });

function wait() {
  if (!isPromiseResolved) setTimeout(wait, 1000);
}

wait();
