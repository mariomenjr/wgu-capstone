const tf = require("@tensorflow/tfjs-node");

async function trainModel(xTrain, yTrain, xTest, yTest) {
  console.debug({ xTrain, yTrain, xTest, yTest });

  const model = tf.sequential();

  const learningRate = 0.01;
  const countEpochs = 40;
  const optimizer = tf.train.adam(learningRate);

  [
    {
      units: 10,
      activation: `sigmoid`,
      inputShape: [xTrain.shape[1]],
    },
    { units: 7, activation: `softmax` },
  ].forEach((layer) => model.add(tf.layers.dense(layer)));

  model.compile({
    optimizer,
    loss: `categoricalCrossentropy`,
    metrics: [`accuracy`],
  });

  const history = await model.fit(xTrain, yTrain, {
    epochs: countEpochs,
    validationData: [xTest, yTest],
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.debug(`Epoch: ${epoch} Logs: ${logs}`);
        await tf.nextFrame();
      },
    },
  });

  console.debug({ history });

  return model;
}

module.exports = (props) => async (tensors) => await trainModel(...tensors);
