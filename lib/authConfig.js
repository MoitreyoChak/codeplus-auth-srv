import { connectDB } from "@/lib/mongo";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                await connectDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if (!user) throw new Error("email does not exist.Please create an account first");

                const passwordMatch = credentials.password == user.password;

                // const passwordMatch = await bcrypt.compare(
                //     credentials.password,
                //     user.password
                // );

                if (!passwordMatch) throw new Error("Wrong Password");
                return user;

                // return {
                //     id: "user1",
                //     name: "Thomas"
                // }
            }
        })
    ], callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;  // Store id inside the token
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.id;
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    }
}

export default NEXTAUTH_CONFIG