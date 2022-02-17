//import { getAccessToken , getRefreshToken ,hashPassword ,verifyPassword } from '../../utils/userUtils'
import {IContext, ITypeContext} from '../../interface/graphql-interface'
//import { CategoryType} from  '../schema/types/categoryType'




export const categoryResolvers = {

    Query : {
        getUserCategories : async (_ :any, { userId }:any , context : ITypeContext )=>{
            try {
                
                const categories = await context.prisma.category.findMany({

                    where : {
                        userId : userId
                    }

                })

                return categories

            }catch(error){
                console.log(error)
            }
        }
    }
    ,

    Mutation : {
        createCategory : async ( _ :any,  { categoryName ,  userId , description , subject , parentId }:any, context : ITypeContext )=>{


            try{

                const category =  await context.prisma.category.create({
                    data : {
                        categoryName : categoryName ,
                        userId : userId ,
                        expertise : 0 ,
                        createdAt : new Date().toISOString() ,
                        description : description ,
                     
                    }
                })
    
                return category 


            }catch(error){
                console.log(error)
            }
          
        } ,

        deleteCategories : async ( _:any, {ids}:any, context: IContext ) =>{
            try{
                console.log(ids)

                const idsToNumberList = ids.map((id:any)=>(
                    typeof id == 'number' ? id : parseInt(id , 10)
                ))
                const deletedCategories  =   await context.prisma.category.deleteMany({
                    where : {
                        id : {
                            in : idsToNumberList 
                        }
                    }
                })
                return true
    
            }catch(error){
                console.log(error)
                return false
                
            }
        },

        deleteCategory : async (_ :any, {id} :any, context:IContext )=>{
            try{

                const deletedCategory = await context.prisma.category.delete({
                    where : {
                        id : id
                    }
                })
                return deletedCategory
            }catch(error){
                console.log(error)
            }
        }
    }


    
}