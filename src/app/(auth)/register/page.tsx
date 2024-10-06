"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";
import { useSession } from "next-auth/react";
import info from "@/constants/info";

export default function Register() {
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [userIdError, setUserIdError] = useState<string | null>(null);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // ログインしてたらトップ画面に遷移する
        if (status === "authenticated") {
            router.push("/");
        }
    }, [router, status]);

    const resetError = () => {
        setError(null);
        setEmailError(null);
        setPasswordError(null);
        setNameError(null);
        setUserIdError(null);
    };

    const handleSubmit = async (formData: FormData) => {
        const { email, password, name, userId } = Object.fromEntries(
            formData
        ) as {
            [K in string]: string;
        };

        resetError();

        const response = await register({ email, password, name, userId });

        if (response.error) {
            // setError(response.error);
            console.error(response.error);
            setError(response.error);
            setEmailError(response.email ?? null);
            setPasswordError(response.password ?? null);
            setNameError(response.name ?? null);
            setUserIdError(response.userId ?? null);
        }

        if (response.user) {
            router.push("/");
        }
    };

    return (
        <section className="flex h-full w-full flex-col items-center justify-center bg-slate-200">
            <div className="flex w-max max-w-[80%] flex-col gap-4 rounded-lg border border-gray-200 bg-white px-6 py-10">
                <h1 className="border-b border-b-slate-200 pb-4 text-2xl font-bold">
                    {info.title}
                </h1>
                <form action={handleSubmit} className="flex flex-col gap-4">
                    {error && <span className="text-red-500">{error}</span>}
                    <div>
                        <label className="label" htmlFor="email">
                            メールアドレス
                        </label>
                        {emailError && (
                            <span className="text-red-500">{emailError}</span>
                        )}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input input-bordered w-full"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="password">
                            パスワード
                        </label>
                        {passwordError && (
                            <span className="text-red-500">
                                {passwordError}
                            </span>
                        )}
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input input-bordered w-full"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="name">
                            名前
                        </label>
                        {nameError && (
                            <span className="text-red-500">{nameError}</span>
                        )}
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input input-bordered w-full"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="userId">
                            ユーザーID
                        </label>
                        {userIdError && (
                            <span className="text-red-500">{userIdError}</span>
                        )}
                        <input
                            type="text"
                            name="userId"
                            id="userId"
                            className="input input-bordered w-full"
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        登録
                    </button>
                </form>
                <Link href="/login" className="btn btn-link btn-sm">
                    ログインする
                </Link>
            </div>
        </section>
    );
}
