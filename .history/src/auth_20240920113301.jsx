import NextAuth from "next-auth"
import G
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})