import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"
import { ITypeContext} from '../../../interface/graphql-interface'

import { DeckType }  from './deck'

export const CardType = new GraphQLObjectType({
    name :  'CardType',
    fields : ():any=>({
        id : { type : GraphQLInt } ,
        question : { type : GraphQLString} ,
        answer : { type : GraphQLString} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt} ,
        nextOccurrence : { type : GraphQLString} ,
        decks : { 
            type : new GraphQLList(DeckType) ,
            resolve: async (parent:any ,args:any , context : ITypeContext)=>{
                const decks = await context.prisma.card.findMany({
                    where : {
                        id : parent.id
                    },
                    include : { decks: true}
                })

                return decks 
            }
        }

    })
})