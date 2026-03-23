
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { PrismaClient } from "@prisma/client";

export function buildAuthOptions(prisma: PrismaClient, userType: 'admin' | 'user'): AuthOptions {
  return {
    providers: [
      CredentialsProvider({
        name: userType === 'admin' ? 'Admin' : 'Korisnik',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
          const user = await prisma.korisnik.findUnique({
            where: { email: credentials.email },
          });
          if (!user || !user.lozinka) return null;
          if (!(await compare(credentials.password, user.lozinka))) return null;
          return {
            id: user.id,
            email: user.email,
            name: user.ime + ((user as any).prezime ? ' ' + (user as any).prezime : ''),
            role: user.uloga,
          };
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token) {
          // @ts-expect-error: user may be undefined
          session.user.id = token.id;
          // @ts-expect-error: user may be undefined
          session.user.role = token.role;
        }
        return session;
      },
      async jwt({ token, user }: { token: JWT; user?: User }) {
        if (user) {
          token.id = user.id;
          // @ts-expect-error: role may not exist on User
          token.role = user.role;
        }
        return token;
      },
    },
  };
}
