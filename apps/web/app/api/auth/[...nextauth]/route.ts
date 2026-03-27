import NextAuth from "next-auth";
import { buildAuthOptions } from "@monorepo/shared/nextauth";
import { prisma } from "../../../lib/prisma";

const handler = NextAuth(buildAuthOptions(prisma, "user"));
export { handler as GET, handler as POST };
