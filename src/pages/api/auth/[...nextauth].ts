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
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {
                data: {
                  email
                }
              }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          ),
        )
        
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})