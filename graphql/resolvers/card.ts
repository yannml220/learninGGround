import {IContext, ITypeContext} from '../../interface/graphql-interface'
//import { CardType} from  '../schema/types/cardType'




export const cardResolvers = {
    Query : {

        getDeckCards : async (_:any , { id }:any , context : IContext) =>{
            try{    

                const cards = await context.prisma.card.findMany( {
                    where : {
                        decks : { 
                            some : { 
                                id : id
                            }
                        }
                    }
                } )

                return cards 

            }catch(error){
                console.log(error)
            }
        }
    } ,
    Mutation : {
        createCard : async (_:any , {question , answer , deckId}:any , context:ITypeContext)=>{
            const newCard = await context.prisma.card.create({
                data : {
                    question ,
                    answer ,
                 //no deckId as its a many to many
                    createdAt : new Date().toISOString()
                }
            })
            return newCard
        }
    }
}