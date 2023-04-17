// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { version } = require("../../package.json");


const buildTime = new Date().toISOString();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({
    version,
    buildTime,
  });
}
