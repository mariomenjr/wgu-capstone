import type { WguApiRequest, WguApiResponse } from "../../interfaces/Wgu";
import type { Tensor, Rank } from "@tensorflow/tfjs-node";

import { tensor2d } from "@tensorflow/tfjs-node";

export default async function handler(req: WguApiRequest, res: WguApiResponse) {
  const { volume, increase } = req.query;
  const sequential = req.wgu.sequential;
  
  const vectors = [[+volume, +increase, 1]];
  const samples = tensor2d(vectors, [vectors.length, 3]);

  const prediction = sequential.predict(samples) as Tensor<Rank>;

  return res.json({ prediction: await prediction.array() });
}