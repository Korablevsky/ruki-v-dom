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
	display: 'swap',
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: {
		template: '%s | Руки в дом',
		default: 'Муж на час, сантехник, сборка мебели – Руки в дом',
	},
	description:
		'Муж на час, сантехник, сборка мебели в Оренбурге. Быстро, качественно, недорого. Закажите услуги проверенных мастеров на Руки в дом!',
	keywords:
		'муж на час, сантехник на дом, сборка мебели, ремонт мебели, бытовые услуги, мастер на час, услуги сантехника',
	authors: [{ name: 'Руки в дом' }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'verification_token',
		yandex: 'verification_token',
	},
	metadataBase: new URL('https://rukiwdom.ru'),
	alternates: {
		canonical: 'https://rukiwdom.ru',
	},
	icons: {
		icon: [
			{ url: '/favicon.png', type: 'image/x-icon' },
			{ url: '/favicon.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
		other: [
			{
				rel: 'mask-icon',
				url: '/favicon.png',
			},
		],
	},
	manifest: '/manifest.json',
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
		url: 'https://rukiwdom.ru',
		siteName: 'Руки в дом',
		locale: 'ru_RU',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Муж на час, сантехник, сборка мебели – Руки в дом',
		description:
			'Муж на час, сантехник, сборка мебели в Оренбурге. Быстро, качественно, недорого.',
		images: ['/favicon.png'],
		creator: '@RukiWDom',
	},
	other: {
		'yandex-verification': 'verification_token',
		'google-site-verification': 'verification_token',
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
				<link rel='icon' href='/favicon.png' type='image/png' />
				<link rel='icon' href='/favicon.png' type='image/png' sizes='16x16' />
				<link rel='icon' href='/favicon.png' type='image/png' sizes='32x32' />
				<link rel='icon' href='/favicon.png' type='image/png' sizes='96x96' />
				<link rel='yandex-tableau-widget' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/favicon.png' />
				<link rel='manifest' href='/manifest.json' />
				<meta name='format-detection' content='telephone=no' />
			</Head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-white to-pink-100 `}
			>
				<Header />
				<div className='flex flex-grow flex-1'>
					<main className='container mx-auto px-4 w-full flex flex-col min-h-[calc(100vh-200px)] gap-8 pb-8'>
						{children}
					</main>
				</div>
				<Footer />
				<Toaster
					richColors
					position='bottom-right'
					className='hidden sm:block'
				/>
				<Toaster richColors position='top-center' className='block sm:hidden' />

				{/* Структурированные данные для SEO */}
				<Script
					id='organization-schema'
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'Руки в дом',
							url: 'https://rukiwdom.ru',
							logo: {
								'@type': 'ImageObject',
								url: 'https://rukiwdom.ru/favicon.png',
								width: '512',
								height: '512',
							},
							description:
								'Руки в дом – Помогает найти специалистов, которые сделают работу быстро и качественно',
							contactPoint: {
								'@type': 'ContactPoint',
								telephone: '+79534574099',
								contactType: 'customer service',
								areaServed: 'RU',
								availableLanguage: 'Russian',
							},
						}),
					}}
				/>
				<Script
					id='local-business-schema'
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'LocalBusiness',
							name: 'Руки в дом',
							image: 'https://rukiwdom.ru/favicon.png',
							'@id': 'https://rukiwdom.ru',
							url: 'https://rukiwdom.ru',
							telephone: '+79534574099',
							priceRange: '₽₽',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Оренбург',
								addressRegion: 'Оренбургская область',
								addressCountry: 'RU',
							},
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '51.7727',
								longitude: '55.1007',
							},
							openingHoursSpecification: {
								'@type': 'OpeningHoursSpecification',
								dayOfWeek: [
									'Monday',
									'Tuesday',
									'Wednesday',
									'Thursday',
									'Friday',
									'Saturday',
									'Sunday',
								],
								opens: '09:00',
								closes: '21:00',
							},
							sameAs: ['https://vk.com/rukiwdom', 'https://t.me/korablevsky'],
						}),
					}}
				/>
			</body>
		</html>
	)
}
