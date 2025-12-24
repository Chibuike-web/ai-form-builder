import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	experimental: {
		turbopackFileSystemCacheForBuild: true,
	},
	typedRoutes: true,
};

export default nextConfig;
