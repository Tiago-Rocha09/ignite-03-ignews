import { query as q } from 'faunadb';

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna';

export default NextAuth({ 
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTE_ID,
      clientSecret: process.env.GITHUB_CLIENTE_SECRET,
    }),
  ],
  secret: process.env.SIGNING_KEY,
  callbacks: {
    async signIn({user, account, profile}){
      try {
        console.log(process.env.FAUNADB_KEY);
        
        const { email } = user;
        console.log(email);
        
        await fauna.query(
          q.Create(
            q.Collection('users'),
            {
              data: {
                email
              }
            }
          )
        )
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})