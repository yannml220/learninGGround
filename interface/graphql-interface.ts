import  { NextApiRequest , NextApiResponse} from 'next'
import  {PrismaClient} from '@prisma/client'

export interface IContext {
    req : NextApiRequest ,
    res : NextApiResponse ,
    prisma : PrismaClient

}


export interface ITypeContext {
    prisma : PrismaClient
}