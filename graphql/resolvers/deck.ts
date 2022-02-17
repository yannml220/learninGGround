import {IContext, ITypeContext} from '../../interface/graphql-interface'
//import { DeckType} from  '../schema/types/deckType'





export const deckResolvers = {

    Query  : {
        getCategoryDeck : async ( _:any, { categoryId }:any , context : IContext)=>{
            try {

                const sanitizeCategoryId = categoryId.map((id:any)=>(
                    typeof id == 'number' ? id : parseInt(id, 10)
                ))
                
                const decks = await context.prisma.deck.findMany({

                    where : {
                        categoryId  : {
                            in : sanitizeCategoryId
                        }
                    }

                })

                return decks

            }catch(error){
                console.log(error)
            }
        } ,

        getDeckInfos : async (_ :any, { id }:any , context : IContext ) => {
            try{

                const deckInfos = context.prisma.deck.findFirst({
                    where : {
                        id : id
                    }
                })
                return deckInfos

            }catch(error){
                console.log(error)
            }
        }

    } ,


    Mutation  : {
        createDeck : async (_ : any  , args:any , context : IContext )=>{
            
            const newDeck = context.prisma.deck.create({
                data : {
                    deckName : args.deckName ,
                    categoryId :  args.categoryId   ,
                    createdAt : new Date().toISOString()
                }
            })
            return newDeck

        }
    }
}