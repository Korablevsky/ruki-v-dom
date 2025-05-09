import { Footer } from '@/widgets/footer/footer'
import { Header } from '@/widgets/header/header'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
	title: 'Руки в дом – Помогаем делом',
	description:
		'Руки в дом – Помогает найти специалистов, которые сделают работу быстро и качественно',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-indigo-200 via-white to-pink-100 `}
			>
				<Header />
				<main className='container mx-auto px-4 flex-grow flex-1 flex flex-col gap-8 '>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
