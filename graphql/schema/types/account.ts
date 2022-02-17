
import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from 'graphql'
import { ITypeContext } from '../../../interface/graphql-interface'
import { UserType }  from './user'




export const AccountType = new GraphQLObjectType({
    name :  'AccountType',
    fields : ():any=>({
        id : {type : GraphQLID} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        user : {
            type : UserType ,
            resolve : async (parent:any ,args:any , context : ITypeContext)=>{
                const user = context.prisma.user.findFirst({
                    where : {
                        id : parent.userId
                    }
                })
                return user
            }
        } ,

      
    })
})