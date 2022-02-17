import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"



import { AccountType }  from './account'
import { CategoryType}  from './category'
import { IContext, ITypeContext }  from '../../../interface/graphql-interface'

//import { prisma } from '../../../index'


export const UserType = new GraphQLObjectType({
    name :  'UserType',
    fields : ():any=> ({
      
        id : {type : GraphQLID } ,
        username : {type : GraphQLString} ,
        password : {type : GraphQLString} ,
        email : {type : GraphQLString} ,
        emailVerified: {type : GraphQLString} ,
        image : { type :GraphQLString},
        account : {
            type : new GraphQLList(AccountType) ,
            resolve: async (parent:any ,args:any , context : ITypeContext )=>{
                const account = await context.prisma.user.findMany({
                    where : {
                        id : parent.id ,
                    },
                    include : { accounts :true }
                })
                
                return account
            }
        },
        categories : {
            type : new GraphQLList(CategoryType) ,
            resolve: async (parent:any ,args:any , context: ITypeContext)=>{
                const categories = context.prisma.category.findMany({
                    where : { userId : parent.id }
                })
                return categories
            }
        }
    
    }),

    
})