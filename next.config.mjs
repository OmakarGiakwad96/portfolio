/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No ESLint setup ships with this project; don't block builds on it.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
