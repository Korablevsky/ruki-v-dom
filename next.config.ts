import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	output: 'standalone',
	/* config options here */
	// experimental: {
	// 	serverActions: {
	// 		bodySizeLimit: '10mb',
	// 	},
	// },
}

export default nextConfig
