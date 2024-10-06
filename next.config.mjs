/** @type {import('next').NextConfig} */
const nextConfig = {
    // next/imageのURL許可設定（後で消したい）
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
