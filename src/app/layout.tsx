import { PostHogProvider } from '@/shared/lib/ph-provider'
import { Footer } from '@/widgets/footer/footer'
import { Header } from '@/widgets/header/header'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Муж на час, сантехник, сборка мебели – Руки в дом',
	description:
		'Муж на час, сантехник, сборка мебели в Оренбурге. Быстро, качественно, недорого. Закажите услуги проверенных мастеров на Руки в дом!',
	keywords:
		'муж на час, сантехник на дом, сборка мебели, ремонт мебели, бытовые услуги, мастер на час, услуги сантехника',
	authors: [{ name: 'Руки в дом' }],
	robots: 'index, follow',
	metadataBase: new URL('https://rukivdom.ru'),
	// alternates: {
	// 	canonical: 'https://rukivdom.ru',
	// },
	icons: {
		icon: [
			{ url: '/favicon.png', type: 'image/x-icon' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
	},
	openGraph: {
		title: 'Муж на час, сантехник, сборка мебели – Руки в дом',
		description:
			'Муж на час, сантехник, сборка мебели в Оренбурге. Быстро, качественно, недорого.',
		images: [
			{
				url: '/favicon.png',
				width: 1200,
				height: 630,
				alt: 'Руки в дом - услуги сантехника и сборки мебели',
			},
		],
		type: 'website',
		url: 'https://rukivdom.ru',
		siteName: 'Руки в дом',
		locale: 'ru_RU',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Муж на час, сантехник, сборка мебели – Руки в дом',
		description:
			'Муж на час, сантехник, сборка мебели в Оренбурге. Быстро, качественно, недорого.',
		images: ['/favicon.png'],
		creator: '@RukiVDom',
	},
	other: {
		script: JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: 'Руки в дом',
			description: 'Услуги муж на час, сантехник, сборка мебели в Оренбурге',
			url: 'https://rukivdom.ru',
			telephone: '+7-XXX-XXX-XXXX',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Оренбург',
				addressCountry: 'RU',
			},
			image: 'https://rukivdom.ru/favicon.png',
			openingHours: 'Mo-Su 09:00-21:00',
		}),
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#ffffff',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<Head>
				<link rel='icon' href='/favicon.png' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<link rel='manifest' href='/manifest.json' />
				<meta name='format-detection' content='telephone=no' />
			</Head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-white to-pink-100 `}
			>
				<PostHogProvider>
					<Header />
					<div className='flex'>
						<main className='container mx-auto px-4 flex-grow flex-1 flex flex-col gap-8 '>
							{children}
						</main>
					</div>
					<Footer />
					<Toaster
						richColors
						position='bottom-right'
						className='hidden sm:block'
					/>
					<Toaster
						richColors
						position='top-center'
						className='block sm:hidden'
					/>
				</PostHogProvider>

				{/* Структурированные данные для SEO */}
				<Script
					id='structured-data'
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'Руки в дом',
							url: 'https://rukivdom.ru',
							logo: 'https://rukivdom.ru/favicon.png',
							description:
								'Руки в дом – Помогает найти специалистов, которые сделают работу быстро и качественно',
							contactPoint: {
								'@type': 'ContactPoint',
								telephone: '+7-XXX-XXX-XXXX',
								contactType: 'customer service',
							},
						}),
					}}
				/>
			</body>
		</html>
	)
}
