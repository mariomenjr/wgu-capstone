import { WguDate } from './../../interfaces/Wgu';
import type { IWguApiRequest, IWguApiResponse } from "../../interfaces/Wgu";
import type { Tensor, Rank } from "@tensorflow/tfjs-node";

import { tensor2d } from "@tensorflow/tfjs-node";

export default async function handler(req: IWguApiRequest, res: IWguApiResponse) {
  const { volume, increase, currency } = req.query;
  const sequential = req.wgu.sequential;
  
  const vector = [+(increase ?? 0), +(volume ?? 0), +(currency ?? 0), (new WguDate()).getWeekNumber()];
  const samples = tensor2d([vector], [1, vector.length]);
  
  const tensor = sequential.predict(samples) as Tensor<Rank>;
  const prediction = await tensor.array();

  return res.json((prediction as number[][]).shift());
}