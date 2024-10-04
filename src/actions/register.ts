"use server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const register = async (values: Record<string, string>) => {
    const { email, password, name, userId } = values;

    try {
        await connectDB();
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return { error: "そのメールアドレスは既に登録されています" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            userId,
        });

        const savedUser = await user.save();

        return { user: savedUser };
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof mongoose.Error.ValidationError) {
            const { email, password, name, userId } = error.errors;
            return {
                error: "登録時にエラーが発生しました",
                email: email?.message ?? null,
                password: password?.message ?? null,
                name: name?.message ?? null,
                userId: userId?.message ?? null,
            };
        } else {
            return { error: "ユーザー登録に失敗しました" };
        }
    }
};
