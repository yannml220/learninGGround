import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import axios from 'axios'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
import { NextApiHandler , NextApiRequest , NextApiResponse} from 'next';
import nextAuth from "next-auth";

const prisma = new PrismaClient()


const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const user = await prisma.user.findFirst({ 
          where: { email : credentials?.username}
        })
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          
          return null
          
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter        
        }
      }
    })
    /*FacebookProvider({
      clientId: "",
      clientSecret: "",
    }),
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),*/
    
  ],
  adapter: PrismaAdapter(prisma),
 
  
}



const authHandler: NextApiHandler = (req : NextApiRequest , res : NextApiResponse)=> nextAuth(req ,res , options);
export default authHandler ;






    