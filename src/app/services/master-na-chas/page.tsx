import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { PriceTarget } from '@/widgets/price-target/price-target'
import { WhyMaster } from '@/widgets/why-master/why-master'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title:
		'Мастер на час в Оренбурге – Быстрый ремонт и бытовые услуги | Руки в дом',
	description:
		'Мастер на час в Оренбурге ⚡ Быстрый ремонт, мелкие бытовые работы, установка техники. Опытные мастера, доступные цены. Вызов мастера на дом за 30 минут!',
	keywords:
		'мастер на час, мастер на дом, бытовые услуги, мелкий ремонт, установка техники, ремонт мебели, электрик, слесарь, Оренбург',
	openGraph: {
		title: 'Мастер на час в Оренбурге – Быстрый ремонт и бытовые услуги',
		description:
			'Мастер на час в Оренбурге ⚡ Быстрый ремонт, мелкие бытовые работы, установка техники. Опытные мастера, доступные цены.',
		url: 'https://rukiwdom.ru/services/master-na-chas',
		siteName: 'Руки в дом',
		images: [
			{
				url: 'https://rukiwdom.ru/png/page-master/santeh.webp',
				width: 1200,
				height: 630,
				alt: 'Мастер на час в Оренбурге - быстрый ремонт и бытовые услуги',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Мастер на час в Оренбурге – Быстрый ремонт и бытовые услуги',
		description:
			'Мастер на час в Оренбурге ⚡ Быстрый ремонт, мелкие бытовые работы, установка техники.',
		images: ['https://rukiwdom.ru/png/page-master/santeh.webp'],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/services/master-na-chas',
	},
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
}

export default function MasterNaChasPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Мастер на час',
		description:
			'Услуги мастера на час в Оренбурге: мелкий ремонт, установка техники, бытовые работы',
		provider: {
			'@type': 'LocalBusiness',
			name: 'Руки в дом',
			url: 'https://rukiwdom.ru',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Оренбург',
				addressCountry: 'RU',
			},
			telephone: '+79534574099',
		},
		areaServed: {
			'@type': 'City',
			name: 'Оренбург',
		},
		serviceType: 'Мастер на час',
		category: 'Бытовые услуги',
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			priceCurrency: 'RUB',
			description: 'Услуги мастера на час по доступным ценам',
		},
	}

	return (
		<>
			<Script
				id='master-na-chas-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<main className='py-10'>
				<header>
					<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
						Мастер на час в Оренбурге
					</h1>
					<p className='text-center text-gray-600 mb-8 max-w-3xl mx-auto'>
						Нужен быстрый ремонт или помощь по дому? Наши опытные мастера
						выполнят любые бытовые работы качественно и в срок. Вызов мастера на
						дом за 30 минут!
					</p>
				</header>

				<section className='flex flex-col gap-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<CardMainPage
							image='/png/page-master/santeh.webp'
							title='Быстрый и качественный ремонт'
							description='Доверьте свой дом профессионалам. Мастер выполнит работу оперативно и качественно.'
						/>
						<WhyMaster />
					</div>

					<section className='bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100'>
						<div className='text-center mb-8'>
							<h2 className='text-xl md:text-2xl font-bold text-indigo-700 mb-3'>
								Услуги мастера на час в Оренбурге
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-indigo-600 text-sm'>🔧</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Мелкий ремонт по дому
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-blue-600 text-sm'>📱</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Установка и подключение техники
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-green-600 text-sm'>🪑</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Ремонт мебели и фурнитуры
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-yellow-600 text-sm'>⚡</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Электромонтажные работы
									</span>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-cyan-600 text-sm'>🚿</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сантехнические работы
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-purple-600 text-sm'>📏</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Установка полок и карнизов
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-red-600 text-sm'>🔐</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Замена замков и ручек
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-orange-600 text-sm'>🏠</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Другие бытовые услуги
									</span>
								</div>
							</div>
						</div>
					</section>

					<PriceTarget />
					<DashboardOrder />
				</section>
			</main>
		</>
	)
}
