import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	reactCompiler: true,
	reactStrictMode: true,

	turbopack: {
		root: "/Users/ensp1r/Documents/react-apps/top-app",
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},

  // Fallback for Webpack mode (next dev --webpack / next build --webpack)
	
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "example.com",
			},
			{
				protocol: "https",
				hostname: "cdn.example.com",
			},
		],
	},

	webpack(config, options) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [{ removeViewBox: false }],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
  },
};

export default nextConfig;
