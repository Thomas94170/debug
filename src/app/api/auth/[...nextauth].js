import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const users = db.collection("users");
        const user = await users.findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
});
