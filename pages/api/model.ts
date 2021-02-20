import type { WguApiRequest, WguApiResponse } from "../../interfaces/Wgu";
import type { Tensor, Rank } from "@tensorflow/tfjs-node";

import { tensor2d } from "@tensorflow/tfjs-node";

export default async function handler(req: WguApiRequest, res: WguApiResponse) {
  const { volume, diff } = req.query;
  const sequential = req.wgu.sequential;
  
  const vectors = [[+volume, +diff]];
  const samples = tensor2d(vectors, [vectors.length, 2]);

  const prediction = sequential.predict(samples) as Tensor<Rank>;

  return res.json({ prediction: await prediction.array() });
}