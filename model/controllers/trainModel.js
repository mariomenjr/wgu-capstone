const tf = require("@tensorflow/tfjs-node");

async function trainModel({ tensors: [xTrain, yTrain, xTest, yTest], props }) {
  
  const model = tf.sequential();

  const optimizer = tf.train.adam(props.learningRate);

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
    epochs: props.countEpochs,
    validationData: [xTest, yTest],
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        await tf.nextFrame();
      },
    },
  });

  return model;
}

module.exports = (props) => async (tensors) => await trainModel({ tensors, props });
