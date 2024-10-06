"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const { status, data } = useSession();
    const router = useRouter();

    const showAccount = () => {
        if (status === "authenticated") {
            return (
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="avatar btn btn-circle btn-ghost"
                    >
                        <div className="w-10 rounded-full">
                            <Image
                                alt="Tailwind CSS Navbar component"
                                src={
                                    data?.user?.image ??
                                    "https://via.placeholder.com/150"
                                }
                                fill
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a
                                onClick={() =>
                                    signOut({ redirect: false }).then(() => {
                                        router.push("/");
                                    })
                                }
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <Link href="/login" className="btn btn-ghost">
                    Login
                </Link>
            );
        }
    };

    return (
        <header className="navbar mx-auto mb-10 mt-4 w-[80%] rounded-box bg-base-100 shadow-xl">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    Header
                </Link>
            </div>
            {showAccount()}
        </header>
    );
}
