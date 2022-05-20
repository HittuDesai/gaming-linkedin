import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({session, isSigningIn, isSigningUp}) {
      console.log(isSigningIn);
      console.log(isSigningUp);
      console.log("BRUH");
      if(isSigningIn)
        session.type = "signin";
      if(isSigningUp)
        session.type = "signup";
      return session;
    },
  }
})