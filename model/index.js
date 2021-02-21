require("dotenv").config();

const { PriceCollection } = require("./config/config");

const fileReader = require("./utils/fileReader");

const processData = require("./controllers/processData");
const makeTensors = require("./controllers/makeTensors");
const trainModel = require("./controllers/trainModel");

const testSplit = process.env.TEST_SPLIT || 0.2;
const countEpochs = process.env.COUNT_EPOCHS || 50;
const learningRate = process.env.LEARNING_RATE || 0.1;

module.exports = function model() {
  return Promise.all(PriceCollection.map((fileObj) => fileReader.load(fileObj)))
    .then(processData({}))
    .then(makeTensors({ testSplit }))
    .then(trainModel({ countEpochs, learningRate }))
    .catch((e) => console.error({ e }));
};
