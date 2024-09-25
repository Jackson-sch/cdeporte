import NextAuth from "next-auth"
import Google 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})