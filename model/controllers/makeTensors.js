const tf = require("@tensorflow/tfjs-node");

const Enums = require("../config/enums");
const { WeekDays } = require("../config/config");

function makeTensors(domain, range, testSplit) {
  const countSamples = domain.length;
  if (countSamples !== range.length)
    throw new Error(`Different numbers of Samples`);

  const countTests = Math.round(countSamples * testSplit);
  const countTrains = countSamples - countTests;

  const xDimension = domain[0].length;

  const xs = tf.tensor2d(domain, [countSamples, xDimension]);
  const ys = tf.oneHot(tf.tensor1d(range).toInt(), WeekDays.length);

  return [
    xs.slice([0, 0], [countTrains, xDimension]),
    ys.slice([0, 0], [countTrains, WeekDays.length]),
    xs.slice([countTrains, 0], [countTests, xDimension]),
    ys.slice([0, 0], [countTests, WeekDays.length]),
  ];
}

module.exports = ({ testSplit = 0.2 }) => (rows) =>
  tf.tidy(() => {
    const weekDaysCount = WeekDays.length;

    const domainMatrix = Array.from({ length: weekDaysCount }, () => []);
    const rangeMatrix = Array.from({ length: weekDaysCount }, () => []);

    for (const row of rows) {
      const y = row[Enums.Columns.Weekday];

      rangeMatrix[y].push(y);
      domainMatrix[y].push([
        row[Enums.Columns.Close] - row[Enums.Columns.Open],
        row[Enums.Columns.Volume],
        row[Enums.Columns.Symbol]
      ]);
    }
    
    const tensors = [[], [], [], []];

    for (let i = 0; i < weekDaysCount; i++) {
      const [xTrain, yTrain, xTest, yTest] = makeTensors(
        domainMatrix[i],
        rangeMatrix[i],
        testSplit
      );

      tensors[0].push(xTrain);
      tensors[1].push(yTrain);
      tensors[2].push(xTest);
      tensors[3].push(yTest);
    }

    const concatAxis = 0;
    return [
      tf.concat(tensors[0], concatAxis),
      tf.concat(tensors[1], concatAxis),
      tf.concat(tensors[2], concatAxis),
      tf.concat(tensors[3], concatAxis),
    ];
  });
