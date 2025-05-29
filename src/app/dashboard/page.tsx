import { CardMaster } from '@/entities/card-master/card-master'
import { SearchCheck, UserRoundPlus } from 'lucide-react'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Выбор услуг - Найти мастера или стать мастером | Руки в дом',
	description:
		'Выберите нужную опцию: найти проверенного мастера для решения бытовых задач или стать мастером и предложить свои услуги. Бесплатная регистрация и поиск.',
	keywords:
		'найти мастера, стать мастером, услуги мастеров, регистрация мастера, поиск специалистов, бытовые услуги',
	openGraph: {
		title: 'Выбор услуг - Найти мастера или стать мастером | Руки в дом',
		description:
			'Выберите нужную опцию: найти проверенного мастера для решения бытовых задач или стать мастером и предложить свои услуги.',
		url: 'https://rukiwdom.ru/dashboard',
		images: [
			{
				url: '/png/dashboard/woman.webp',
				width: 1200,
				height: 630,
				alt: 'Выбор услуг на платформе Руки в дом',
			},
		],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/dashboard',
	},
}

export default function DashboardPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Выбор услуг - Руки в дом',
		description:
			'Страница выбора услуг: найти мастера или стать мастером на платформе Руки в дом',
		url: 'https://rukiwdom.ru/dashboard',
		mainEntity: {
			'@type': 'Service',
			name: 'Платформа поиска мастеров',
			description: 'Сервис для поиска мастеров и предложения услуг',
			provider: {
				'@type': 'Organization',
				name: 'Руки в дом',
				url: 'https://rukiwdom.ru',
			},
			areaServed: {
				'@type': 'City',
				name: 'Оренбург',
			},
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: 'Каталог услуг мастеров',
				itemListElement: [
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Поиск мастера',
							description: 'Найдите профессионала для решения ваших задач',
						},
					},
					{
						'@type': 'Offer',
						itemOffered: {
							'@type': 'Service',
							name: 'Регистрация мастера',
							description: 'Предложите свои услуги и найдите клиентов',
						},
					},
				],
			},
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Главная',
					item: 'https://rukiwdom.ru',
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Выбор услуг',
					item: 'https://rukiwdom.ru/dashboard',
				},
			],
		},
	}

	return (
		<>
			<Script
				id='dashboard-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<main className='py-10' role='main'>
				<div className='max-w-6xl mx-auto'>
					{/* <Breadcrumb items={breadcrumbItems} className='mb-6' /> */}

					<header className='text-center mb-12'>
						<h1 className='text-3xl font-bold text-indigo-700 mb-4'>
							Выберите опцию
						</h1>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
							Найдите проверенного мастера для решения ваших задач или станьте
							мастером и предложите свои услуги
						</p>
					</header>

					<section
						className='flex overflow-x-auto pb-4 md:pb-0 md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 lg:gap-10 space-x-4 md:space-x-0'
						aria-label='Варианты использования платформы'
					>
						<article className='min-w-[80vw] snap-center md:min-w-0'>
							<CardMaster
								color='bg-gradient-to-br from-purple-500 to-indigo-600'
								href='/'
								title='Нужен мастер'
								description='Найдите профессионала для решения ваших задач быстро и безопасно'
								image='/png/dashboard/woman.webp'
								buttonText='Найти мастера'
								iconText='Бесплатный поиск'
								icon={<SearchCheck className='w-5 h-5 flex-shrink-0' />}
							/>
						</article>

						<article className='min-w-[80vw] snap-center md:min-w-0'>
							<CardMaster
								color='bg-gradient-to-br from-blue-500/90 to-indigo-600/90'
								href='/vacancies'
								title='Стать мастером'
								description='Предложите свои услуги и найдите новых клиентов на нашей платформе'
								image='/png/page-master/master-dashboard.webp'
								buttonText='Стать мастером'
								iconText='Бесплатная регистрация'
								icon={<UserRoundPlus className='w-5 h-5 flex-shrink-0' />}
							/>
						</article>
					</section>

					<aside className='mt-12 text-center'>
						<div className='bg-white/50 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto'>
							<h2 className='text-xl font-semibold text-gray-800 mb-3'>
								Почему выбирают Руки в дом?
							</h2>
							<div className='grid md:grid-cols-3 gap-4 text-sm text-gray-600'>
								<div>
									<strong className='text-indigo-600'>
										Проверенные мастера
									</strong>
									<br />
									Все специалисты проходят верификацию
								</div>
								<div>
									<strong className='text-indigo-600'>Быстрый поиск</strong>
									<br />
									Найдите мастера за несколько минут
								</div>
								<div>
									<strong className='text-indigo-600'>Безопасные сделки</strong>
									<br />
									Гарантия качества выполненных работ
								</div>
							</div>
						</div>
					</aside>
				</div>
			</main>
		</>
	)
}
