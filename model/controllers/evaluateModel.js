const tf = require("@tensorflow/tfjs-node");
// const { WeekDays } = require("../config/config");

module.exports = () => async (model) => {
  return {
    model,
    sample: tf.tensor2d([[-64.63999999999987, 907873000]], [1, 2]),
  };
  // const prediction = model.predict(tf.tensor2d([[-64.63999999999987, 907873000]], [1, 2]));
};
