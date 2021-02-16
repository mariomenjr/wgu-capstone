const { PriceCollection } = require("./config/config");

const fileReader = require("./utils/fileReader");

const processData = require("./controllers/processData");
const makeTensors = require("./controllers/makeTensors");
const trainModel = require("./controllers/trainModel");

let isPromiseResolved = false;

Promise.all(PriceCollection.map((filePath) => fileReader(filePath)))
  .then(processData({}))
  .then(makeTensors({ testSplit: 0.2 }))
  .then(trainModel({}))
  .catch((e) => console.error({ e }))
  .finally(() => {
    isPromiseResolved = true;
  });

function wait() {
  if (!isPromiseResolved) setTimeout(wait, 1000);
}

wait();
