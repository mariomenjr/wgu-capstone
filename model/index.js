const { PriceCollection } = require("./config/config");

const fileReader = require("./utils/fileReader");
const processData = require("./controllers/processData");
const makeTensors = require("./controllers/makeTensors");

let isPromiseResolved = false;

Promise.all(PriceCollection.map((filePath) => fileReader(filePath)))
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
