import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gadget Specialized Site（仮名）",
    description: "このサイトはガジェットのレビューや紹介に特化した情報共有サイトです",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="antialiased">{children}</body>
        </html>
    );
}
