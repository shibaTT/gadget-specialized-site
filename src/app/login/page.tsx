"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <section>
            <h1>ログイン</h1>
            <form action={handleSubmit}>
                <label htmlFor="email">メールアドレス</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">パスワード</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">ログイン</button>
                {error && <p className="text-red-500">{error}</p>}
                <Link href="/register">ユーザー登録</Link>
            </form>
        </section>
    );
}
