import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema, GraphQLFloat } from "graphql"
import { ITypeContext} from '../../../interface/graphql-interface'

import { AccountType }  from './account'
import {UserType} from './user'

export const CategoryType = new GraphQLObjectType({
    name :  'CategoryType',
    fields : ():any=>({
        id : {type : GraphQLInt} ,
        categoryName : { type : GraphQLString} ,
        expertise : { type : GraphQLFloat } ,
        createdAt : { type : GraphQLString},
        updatedAt : { type : GraphQLString},
        description : { type : GraphQLString} ,
        user : {
            type : UserType ,
            resolve : async (parent:any ,args:any , context : ITypeContext )=>{
                const user = await context.prisma.category.findFirst({
                    where : {  
                        id : parent.user.id
                     }
                })
                
                return user
            }
            
        } 
    })
})