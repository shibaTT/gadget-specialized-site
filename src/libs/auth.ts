import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("認証情報が存在しません");
                }

                await connectDB();
                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    throw new Error("ユーザーが存在しません");
                }

                const isMatch = await bcrypt.compare(credentials!.password, user.password);

                if (!isMatch) {
                    throw new Error("メールアドレス、またはパスワードが違います");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
};
