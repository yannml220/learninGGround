import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
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






    