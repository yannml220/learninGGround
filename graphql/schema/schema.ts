
import {IContext} from '../../interface/graphql-interface'
import {  GraphQLObjectType ,  GraphQLString , GraphQLInt , GraphQLID , GraphQLList , GraphQLSchema, GraphQLFloat, GraphQLBoolean } from "graphql"
import  { AccountType } from './types/account'
import  { CardType } from './types/card'
import  { CategoryType } from './types/category'
import  { DeckType } from './types/deck'
import  { UserType } from './types/user'
import  { userResolvers} from '../resolvers/user'
import { categoryResolvers } from '../resolvers/category'
import { deckResolvers } from '../resolvers/deck'
import { cardResolvers } from '../resolvers/card'





const RootQueryType = new GraphQLObjectType({
    name :  'RootQueryType',
    fields : {
        user : {
            
            type : UserType ,
            args : { id : {type : GraphQLString} } ,
            resolve : userResolvers.Query.user
        }
        ,

        category : {
            type : new GraphQLList(CategoryType) ,
            args : { userId : { type  : GraphQLString} } ,
            resolve : categoryResolvers.Query.getUserCategories
        }
        ,
        getCategoryDecks : {
            type : new GraphQLList(DeckType) ,
            args : { categoryIds : { type : new GraphQLList( GraphQLInt)} },
            resolve : deckResolvers.Query.getCategoryDeck
        } ,

        getDeckCards : {
            type : new GraphQLList( CardType ) ,
            args : { id : { type : GraphQLID }} ,
            resolve : cardResolvers.Query.getDeckCards
        }

        ,
        getDeckInfos : {
            type : DeckType ,
            args : { id : { type : GraphQLInt} } ,
            resolve :  deckResolvers.Query.getDeckInfos
        }
    } 


})




const Mutation = new GraphQLObjectType({
    name : 'Mutation' ,
    fields : {
        registerUser : {
            type : UserType ,
            args : { 
                username : {type :GraphQLString} ,
                password : {type :GraphQLString} ,
                email : {type :GraphQLString} ,
            },
            resolve: userResolvers.Mutation.registerUser
        },
       login : {
           type : UserType ,
           args : {
               username :  {type : GraphQLString}  ,
               password : { type : GraphQLString }
           } ,
           resolve : userResolvers.Mutation.login

       } ,

       createCategory : {
           type :  CategoryType  ,
           args : {

            categoryName : { type : GraphQLString } ,
            userId  : { type : GraphQLID} ,
            description : { type : GraphQLString},
           
           
           },
           resolve : categoryResolvers.Mutation.createCategory
           
       } ,
    
       deleteCategories  :{
           type : CategoryType ,
           args  : {
               ids  : { type : new GraphQLList(GraphQLInt) }
           },
           resolve : categoryResolvers.Mutation.deleteCategories
       }

       ,
       deleteCategory : {
           type : CategoryType ,
           args : {
               id : { type : GraphQLInt }
           },
           resolve : categoryResolvers.Mutation.deleteCategory
       }
       ,

       createDeck : {
           type : DeckType ,
           args : {

                deckName : { type : GraphQLString} ,
                categoryId : { type : GraphQLInt}  ,
           } ,
           resolve : deckResolvers.Mutation.createDeck
       } ,

       createCard : {
           type  : CardType ,
           args :  {
               question : { type : GraphQLString} ,
               answer :   { type : GraphQLString} ,
               deckId : { type  : GraphQLInt }
           } ,
           resolve : cardResolvers.Mutation.createCard
       }
    }

})



module.exports = new GraphQLSchema({
    
    query : RootQueryType ,
    mutation : Mutation
})