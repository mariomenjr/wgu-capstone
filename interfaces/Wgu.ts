import type { NextApiRequest, NextApiResponse } from 'next';
import type { Sequential, Tensor2D } from "@tensorflow/tfjs-node";

import { getWeekNumber } from "../model/utils/extensions";
export interface IWgu {
  sequential: Sequential,
  tensor2d: Tensor2D
}

export interface IWguApiRequest extends NextApiRequest {
  wgu: IWgu
}

export interface IWguApiResponse extends NextApiResponse {}

export class WguDate extends Date {
  getWeekNumber() {
    return getWeekNumber.apply(this);
  };
}