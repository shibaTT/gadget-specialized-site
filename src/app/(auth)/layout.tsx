export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="h-screen w-screen">{children}</main>;
}
