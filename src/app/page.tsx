"use client";
import Header from "@/components/Header";
export default function Top() {
    return (
        <>
            <Header />
            <main className="mx-3 max-w-screen-lg md:mx-auto">
                <h1>Hello, world!</h1>
                <p>ここに記事一覧とかが並んだり並ばなかったりします</p>
            </main>
        </>
    );
}
