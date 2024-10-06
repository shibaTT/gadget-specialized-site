"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import info from "@/constants/info";

export default function Login() {
    const [error, setError] = useState("");
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [router, status]);

    const handleSubmit = async (formData: FormData) => {
        const { email, password } = Object.fromEntries(formData);

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        console.log(response);
        if (response?.error) {
            setError(response.error as string);
        }
        if (response?.ok) {
            router.push("/");
        }
    };

    return (
        <section className="flex h-full w-full flex-col items-center justify-center bg-slate-200">
            <div className="flex w-max max-w-[80%] flex-col gap-4 rounded-lg border border-gray-200 bg-white px-6 py-10">
                <h1 className="border-b border-b-slate-200 pb-4 text-2xl font-bold">
                    {info.title}
                </h1>
                <p className="text-red-600">エラーを積んでください</p>
                <form action={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label" htmlFor="email">
                            <span className="label-text">メールアドレス</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="password">
                            <span className="label-text">パスワード</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        ログイン
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                    <Link href="/register" className="btn btn-link btn-sm">
                        ユーザー登録する
                    </Link>
                </form>
                <Link href="/">← Back to top</Link>
            </div>
        </section>
    );
}
