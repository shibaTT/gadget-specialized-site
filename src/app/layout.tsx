import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/app/provider";
import info from "@/constants/info";

export const metadata: Metadata = {
    title: info.title,
    description: info.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className="antialiased">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
