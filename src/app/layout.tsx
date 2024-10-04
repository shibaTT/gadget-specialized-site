import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/app/provider";

export const metadata: Metadata = {
    title: "Gadget Specialized Site（仮名）",
    description:
        "このサイトはガジェットのレビューや紹介に特化した情報共有サイトです",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="container mx-auto px-4 antialiased">
                <Provider>
                    <main>{children}</main>
                </Provider>
            </body>
        </html>
    );
}
