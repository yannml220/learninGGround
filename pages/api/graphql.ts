
import { ApolloServer  } from 'apollo-server-micro'
import { IContext } from '../../interface/graphql-interface'
import { PrismaClient ,Prisma } from '@prisma/client'
import { NextApiRequest , NextApiResponse } from 'next'
import Cors from 'micro-cors'

const schema = require('../../graphql/schema/schema')

const cors = Cors()
export const prisma = new PrismaClient()


const server = new ApolloServer({
  schema,
  context: (req: NextApiRequest, res: NextApiResponse,prisma:PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>)=>({req, res, prisma})
})

/**
 * https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
type Config = {
  api: {
    externalResolver?: boolean
    bodyParser?: boolean
      | {
          sizeLimit: string
        }
  }
}


const startServer =  server.start()


/*
export default async function(req :NextApiRequest, res:NextApiResponse){
  await startServer
  res.setHeader('Access-Control-Allow-Origin','*')

  await server.createHandler({
    path : "/api/graphql"
  })(req,res)
}

*/


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}



export const config: Config = {
  api: {
    bodyParser: false
  }
}















