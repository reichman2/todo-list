// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  [key: string]: any
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query;
  // res.end(`Post: ${ (slug as string[]).join(', ') }`);
  res.status(200).json({ name: 'John Doe', slug});
}
