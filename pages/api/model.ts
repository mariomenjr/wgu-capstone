import type { WguApiRequest, WguApiResponse } from "../../interfaces/Wgu";
import type { Tensor, Rank } from "@tensorflow/tfjs-node";

import { tensor2d } from "@tensorflow/tfjs-node";

export default async function handler(req: WguApiRequest, res: WguApiResponse) {
  const { volume, increase } = req.query;
  const sequential = req.wgu.sequential;
  
  const vector = [+volume, +increase, 1];
  const samples = tensor2d([vector], [1, vector.length]);

  const tensor = sequential.predict(samples) as Tensor<Rank>;
  const prediction = await tensor.array();

  return res.json((prediction as number[][]).shift());
}