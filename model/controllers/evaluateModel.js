const tf = require("@tensorflow/tfjs-node");
const { WeekDays } = require("../config/config");

module.exports = () => async (model) => {
  const prediction = model.predict(tf.tensor2d([[-64.63999999999987, 907873000]], [1, 2]));
  console.debug(`Buying cryptos winning chances by day\n${(await prediction.array())[0].map((day, index) => `\n${WeekDays[index]}: ${(day * 100).toFixed(2)}%`)}`);
};