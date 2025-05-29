import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { PriceTarget } from '@/widgets/price-target/price-target'
import { WhyMaster } from '@/widgets/why-master/why-master'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Сантехник в Оренбурге – Вызов сантехника на дом 24/7 | Руки в дом',
	description:
		'Сантехник в Оренбурге ⚡ Вызов мастера на дом 24/7. Ремонт сантехники, установка, замена труб, устранение засоров. Опытные сантехники, гарантия качества!',
	keywords:
		'сантехник, сантехник на дом, ремонт сантехники, установка сантехники, замена труб, устранение засоров, сантехнические работы, Оренбург',
	openGraph: {
		title: 'Сантехник в Оренбурге – Вызов сантехника на дом 24/7',
		description:
			'Сантехник в Оренбурге ⚡ Вызов мастера на дом 24/7. Ремонт сантехники, установка, замена труб, устранение засоров.',
		url: 'https://rukiwdom.ru/services/sanitehnik',
		siteName: 'Руки в дом',
		images: [
			{
				url: 'https://rukiwdom.ru/png/page-master/santehnik.webp',
				width: 1200,
				height: 630,
				alt: 'Сантехник в Оренбурге - вызов мастера на дом',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Сантехник в Оренбурге – Вызов сантехника на дом 24/7',
		description:
			'Сантехник в Оренбурге ⚡ Вызов мастера на дом 24/7. Ремонт сантехники, установка, замена труб.',
		images: ['https://rukiwdom.ru/png/page-master/santehnik.webp'],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/services/sanitehnik',
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

export default function SanitehnikPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Сантехнические услуги',
		description:
			'Услуги сантехника в Оренбурге: ремонт, установка, замена сантехники, устранение засоров',
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
		serviceType: 'Сантехнические услуги',
		category: 'Сантехника',
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			priceCurrency: 'RUB',
			description: 'Сантехнические услуги по доступным ценам',
		},
	}

	return (
		<>
			<Script
				id='sanitehnik-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<main className='py-10'>
				<header>
					<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
						Сантехник в Оренбурге
					</h1>
					<p className='text-center text-gray-600 mb-8 max-w-3xl mx-auto'>
						Нужен надежный сантехник? Наши мастера готовы решить любые
						сантехнические проблемы. Быстрый выезд, качественная работа!
					</p>
				</header>

				<section className='flex flex-col gap-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<CardMainPage
							bgColor='bg-gradient-to-br from-teal-500/90 to-sky-600/90'
							image='/png/page-master/santehnik.webp'
							title='Быстрый и качественный ремонт'
							description='Доверьте свой дом профессионалам. Мастер выполнит работу оперативно и качественно.'
						/>
						<WhyMaster />
					</div>

					<section className='bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100'>
						<div className='text-center mb-8'>
							<h2 className='text-xl md:text-2xl font-bold text-indigo-700 mb-3'>
								Сантехнические услуги в Оренбурге
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-blue-600 text-sm'>🚿</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Ремонт и замена смесителей
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-cyan-600 text-sm'>🚽</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Установка унитазов и раковин
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-indigo-600 text-sm'>🔧</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Замена труб и фитингов
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-red-600 text-sm'>💧</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Устранение протечек
									</span>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-yellow-600 text-sm'>🔌</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Прочистка засоров
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-green-600 text-sm'>🔄</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Установка стиральных машин
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-orange-600 text-sm'>🔥</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Ремонт водонагревателей
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-purple-600 text-sm'>⚡</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Аварийный вызов 24/7
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
