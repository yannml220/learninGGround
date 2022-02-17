// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getProviders , getCsrfToken , getSession  } from 'next-auth/react'

import prismaClient from '@prisma/client'



export default function handler(req: NextApiRequest,res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
  const {username , password , email} = req.body
  console.log(username +' '+password+' '+email )
}
