"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";
import { useSession } from "next-auth/react";

export default function Register() {
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [userIdError, setUserIdError] = useState<string | null>(null);
    const { status } = useSession();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

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
        const { email, password, name, userId } = Object.fromEntries(formData) as {
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
        <section>
            <h1>ユーザー登録</h1>
            <form action={handleSubmit} ref={ref}>
                {error && <span className="text-red-500">{error}</span>}
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    {emailError && <span className="text-red-500">{emailError}</span>}
                    <input type="email" name="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    {passwordError && <span className="text-red-500">{passwordError}</span>}
                    <input type="password" name="password" id="password" required />
                </div>
                <div>
                    <label htmlFor="name">名前</label>
                    {nameError && <span className="text-red-500">{nameError}</span>}
                    <input type="text" name="name" id="name" required />
                </div>
                <div>
                    <label htmlFor="userId">ユーザーID</label>
                    {userIdError && <span className="text-red-500">{userIdError}</span>}
                    <input type="text" name="userId" id="userId" />
                </div>
                <button type="submit">登録</button>
            </form>
            <Link href="/login">ログイン</Link>
        </section>
    );
}
