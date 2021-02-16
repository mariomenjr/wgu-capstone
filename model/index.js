const tf = require("@tensorflow/tfjs-node");

const fileReader = require("./utils/fileReader");
const processData = require("./controllers/processData");
const makeTensors = require("./controllers/makeTensors");
const { PriceCollection } = require("./config");

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
