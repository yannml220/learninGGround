import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema } from "graphql"
import { ITypeContext} from "../../../interface/graphql-interface"

import { CategoryType }  from './category'
import { CardType }  from './card'


export const DeckType = new GraphQLObjectType({
    name :  'DeckType',
    fields : ():any=>({
        id : {type : GraphQLInt} , 
        deckName : { type : GraphQLString} , 
        categoryId : { type : GraphQLString} ,
        createdAt : { type : GraphQLString} ,
        updatedAt : { type : GraphQLString} ,
        repetition : { type : GraphQLInt } ,
        expertise : { type : GraphQLInt } ,
        category : { 
            type : CategoryType ,
            resolve : async (parent:any ,args:any , context :ITypeContext)=>{
                const category = await context.prisma.category.findFirst({
                    where : {
                        id : parent.categoryId
                    }
                })
                return category
            }
        } ,
        
        cards: {
            type : new GraphQLList(CardType) ,
            resolve: async (parent:any ,args:any , context : ITypeContext)=>{
                const cards = await context.prisma.deck.findMany({
                    where : {
                        id : parent.id ,
                    },
                    include : { cards:true }
                })

                return cards 
            }
        }

   })
})