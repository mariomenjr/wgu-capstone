import type { NextApiRequest, NextApiResponse } from 'next';
import type { Sequential, Tensor2D } from "@tensorflow/tfjs-node";

export interface Wgu {
  sequential: Sequential,
  tensor2d: Tensor2D
}

export interface WguApiRequest extends NextApiRequest {
  wgu: Wgu
}

export interface WguApiResponse extends NextApiResponse {}