"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Top() {
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <button
                    onClick={() =>
                        signOut({ redirect: false }).then(() => {
                            router.push("/");
                        })
                    }
                >
                    ログアウト
                </button>
            );
        } else if (status === "loading") {
            return <p>読込中</p>;
        } else {
            return <Link href="/login">ログイン</Link>;
        }
    };

    return (
        <div>
            <h1>Hello, world!</h1>
            {showSession()}
        </div>
    );
}
