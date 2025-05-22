import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	output: 'standalone',
	images: {
		unoptimized: false, // Включить оптимизацию
	},
	poweredByHeader: false, // Отключаем заголовок X-Powered-By
	reactStrictMode: true,
	env: {
		TELEGRAM_BOT_RESUME_TOKEN: process.env.TELEGRAM_BOT_RESUME_TOKEN || '',
		TELEGRAM_BOT_ORDER_TOKEN: process.env.TELEGRAM_BOT_ORDER_TOKEN || '',
		TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
	},
	/* config options here */
	// experimental: {
	// 	serverActions: {
	// 		bodySizeLimit: '10mb',
	// 	},
	// },
}

export default nextConfig
