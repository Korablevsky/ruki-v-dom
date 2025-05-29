import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { PriceTarget } from '@/widgets/price-target/price-target'
import { WhyMaster } from '@/widgets/why-master/why-master'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Сборка мебели в Оренбурге – Быстро и качественно | Руки в дом',
	description:
		'Сборка мебели в Оренбурге ⚡ Профессиональная сборка любой мебели: шкафы, кухни, столы, кровати. Опытные мастера, гарантия качества, доступные цены!',
	keywords:
		'сборка мебели, сборка шкафов, сборка кухни, сборка кроватей, сборка столов, мебельщик, сборщик мебели, Оренбург',
	openGraph: {
		title: 'Сборка мебели в Оренбурге – Быстро и качественно',
		description:
			'Сборка мебели в Оренбурге ⚡ Профессиональная сборка любой мебели: шкафы, кухни, столы, кровати.',
		url: 'https://rukiwdom.ru/services/sborka-mebeli',
		siteName: 'Руки в дом',
		images: [
			{
				url: 'https://rukiwdom.ru/png/page-master/master-dashboard.webp',
				width: 1200,
				height: 630,
				alt: 'Сборка мебели в Оренбурге - профессиональные мастера',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Сборка мебели в Оренбурге – Быстро и качественно',
		description:
			'Сборка мебели в Оренбурге ⚡ Профессиональная сборка любой мебели: шкафы, кухни, столы.',
		images: ['https://rukiwdom.ru/png/page-master/master-dashboard.webp'],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/services/sborka-mebeli',
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

export default function SborkaMebelPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Сборка мебели',
		description:
			'Услуги по сборке мебели в Оренбурге: шкафы, кухни, столы, кровати, офисная мебель',
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
		serviceType: 'Сборка мебели',
		category: 'Мебельные услуги',
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			priceCurrency: 'RUB',
			description: 'Услуги по сборке мебели по доступным ценам',
		},
	}

	return (
		<>
			<Script
				id='sborka-mebeli-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<main className='py-10'>
				<header>
					<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
						Сборка мебели в Оренбурге
					</h1>
					<p className='text-center text-gray-600 mb-8 max-w-3xl mx-auto'>
						Нужна профессиональная сборка мебели? Наши опытные мастера соберут
						любую мебель быстро и качественно. Работаем с мебелью всех
						производителей, предоставляем гарантию!
					</p>
				</header>

				<section className='flex flex-col gap-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<CardMainPage
							bgColor='bg-gradient-to-br from-sky-500/90 to-violet-600/90'
							image='/png/page-master/master-dashboard.webp'
							title='Быстрый и качественный ремонт'
							description='Доверьте свой дом профессионалам. Мастер выполнит работу оперативно и качественно.'
						/>
						<WhyMaster />
					</div>

					<section className='bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100'>
						<div className='text-center mb-8'>
							<h2 className='text-xl md:text-2xl font-bold text-indigo-700 mb-3'>
								Услуги по сборке мебели в Оренбурге
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-indigo-600 text-sm'>🚪</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка шкафов и гардеробных
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-blue-600 text-sm'>🍽️</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка кухонной мебели
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-green-600 text-sm'>🛏️</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка кроватей и диванов
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-yellow-600 text-sm'>🪑</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка столов и стульев
									</span>
								</div>
							</div>

							<div className='space-y-4'>
								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-cyan-600 text-sm'>🧸</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка детской мебели
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-purple-600 text-sm'>💼</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Сборка офисной мебели
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-red-600 text-sm'>📏</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Навеска полок и зеркал
									</span>
								</div>

								<div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200'>
									<div className='w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0'>
										<span className='text-orange-600 text-sm'>🔧</span>
									</div>
									<span className='text-gray-700 font-medium'>
										Регулировка фурнитуры
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
