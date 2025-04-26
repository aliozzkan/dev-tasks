import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByCredentials } from "@/data/user/user-data";
import { db } from "@/db";
import { accounts } from "@/db/schema/accounts";
import { sessions } from "@/db/schema/sessions";
import { users } from "@/db/schema/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    usersTable: users,
    sessionsTable: sessions,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    session({ user, session, token }) {
      // Add property to session, like an access_token from a provider.
      // session.accessToken = user.accessToken;
      console.log({ user, token, session });
      session.userId = token.sub!;

      return session;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        try {
          user = await getUserByCredentials({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          console.log("user", user);
        } catch (_error) {
          console.log(_error);
          // If you return null or false then the credentials will be rejected
          // throw new Error("Invalid credentials!");
        }

        if (!user) {
          throw new Error("Invalid credentials!");
        }

        return user;
      },
    }),
  ],
});

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    userId: string;
  }
}
