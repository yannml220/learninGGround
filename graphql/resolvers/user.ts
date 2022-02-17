

import {IContext} from '../../interface/graphql-interface'

//const prisma = new PrismaClient()



interface IuserData  {

    id : number  ;
    username : string ;
    password : string ;
    email : string ;
    token : string ;
   

}



type UserDataClient = Omit< IuserData , "token" >



export  const userResolvers = {

    Query : {
        user : async (_ :any, { id }:any , context : IContext)=> {
            try{
                const user = await context.prisma.user.findUnique({
                    where: {
                      id: id,
                    },
                  })
                console.log(user)

                return user
            }catch(error){
                throw error
            }

        }

    } ,

    Mutation : {

         registerUser : 
            async (_:any , { ...userDetails} , context : IContext  )=>{
               try{
                   


               }catch(error){
                   console.log(error)

               }

                
            }
          ,

          login : async (_:any,{username , password}:any , context:IContext )=>{
            return
           

        }




    }
 
    

        
            
            
                
            
        
    
}