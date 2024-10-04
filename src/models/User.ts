import mongoose, { model, Schema } from "mongoose";

export interface UserModel {
    _id: string;
    userId: string;
    email: string;
    password: string;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserModel>({
    userId: {
        type: String,
        required: [true, "ユーザーIDを入力してください"],
        match: [/^[a-zA-Z0-9_]+$/, "ユーザーIDは半角英数字とアンダーバーのみ使用できます"],
        maxlength: [20, "ユーザーIDは20文字以内で入力してください"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "メールアドレスを入力してください"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "メールアドレスの形式が正しくありません",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "パスワードを入力してください"],
    },
    name: {
        type: String,
        required: [true, "名前を入力してください"],
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
});

const User = mongoose.models?.User || model<UserModel>("User", UserSchema);
export default User;
