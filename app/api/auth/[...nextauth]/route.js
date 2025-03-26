import NextAuth from "next-auth";
import NEXTAUTH_CONFIG from "@/lib/authConfig"

const handler = NextAuth(NEXTAUTH_CONFIG)

export const GET = handler;
export const POST = handler;
