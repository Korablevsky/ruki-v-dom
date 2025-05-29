import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
	title:
		'Услуги мастеров в Оренбурге – Сантехник, сборка мебели, мастер на час | Руки в дом',
	description:
		'Услуги мастеров в Оренбурге ⚡ Сантехник, сборка мебели, мастер на час. Быстрый вызов мастера на дом, качественная работа, доступные цены. Гарантия результата!',
	keywords:
		'услуги мастеров, сантехник, сборка мебели, мастер на час, бытовые услуги, ремонт, Оренбург',
	openGraph: {
		title:
			'Услуги мастеров в Оренбурге – Сантехник, сборка мебели, мастер на час',
		description:
			'Услуги мастеров в Оренбурге ⚡ Сантехник, сборка мебели, мастер на час. Быстрый вызов мастера на дом.',
		url: 'https://rukiwdom.ru/services',
		siteName: 'Руки в дом',
		images: [
			{
				url: 'https://rukiwdom.ru/favicon.png',
				width: 1200,
				height: 630,
				alt: 'Услуги мастеров в Оренбурге - Руки в дом',
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title:
			'Услуги мастеров в Оренбурге – Сантехник, сборка мебели, мастер на час',
		description:
			'Услуги мастеров в Оренбурге ⚡ Сантехник, сборка мебели, мастер на час.',
		images: ['https://rukiwdom.ru/favicon.png'],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/services',
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

export default function ServicesPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Услуги мастеров',
		description: 'Полный список услуг мастеров в Оренбурге',
		itemListElement: [
			{
				'@type': 'Service',
				position: 1,
				name: 'Мастер на час',
				description: 'Быстрый ремонт и бытовые услуги',
				url: 'https://rukiwdom.ru/services/master-na-chas',
			},
			{
				'@type': 'Service',
				position: 2,
				name: 'Сантехнические услуги',
				description: 'Ремонт и установка сантехники',
				url: 'https://rukiwdom.ru/services/sanitehnik',
			},
			{
				'@type': 'Service',
				position: 3,
				name: 'Сборка мебели',
				description: 'Профессиональная сборка любой мебели',
				url: 'https://rukiwdom.ru/services/sborka-mebeli',
			},
		],
	}

	const services = [
		{
			title: 'Мастер на час',
			description: 'Быстрый ремонт, установка техники, мелкие бытовые работы',
			href: '/services/master-na-chas',
			image: '/png/page-master/santeh.webp',
			bgColor: 'from-indigo-500 to-purple-600',
		},
		{
			title: 'Сантехник',
			description: 'Ремонт сантехники, устранение протечек, замена труб',
			href: '/services/sanitehnik',
			image: '/png/page-master/santehnik.webp',
			bgColor: 'from-teal-500 to-sky-600',
		},
		{
			title: 'Сборка мебели',
			description: 'Профессиональная сборка мебели любой сложности',
			href: '/services/sborka-mebeli',
			image: '/png/page-master/master-dashboard.webp',
			bgColor: 'from-sky-500 to-violet-600',
		},
	]

	return (
		<>
			<Script
				id='services-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<main className='py-10'>
				<header className='text-center mb-12'>
					<h1 className='text-3xl font-bold text-indigo-700 mb-4'>
						Услуги мастеров в Оренбурге
					</h1>
					<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
						Профессиональные мастера для решения любых бытовых задач. Быстрый
						выезд, качественная работа, гарантия результата!
					</p>
				</header>

				<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
					{services.map((service, index) => (
						<Link
							key={index}
							href={service.href}
							className='group block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
						>
							<div
								className={`h-48 bg-gradient-to-br ${service.bgColor} relative overflow-hidden`}
							>
								<Image
									src={service.image}
									alt={service.title}
									className='w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity'
								/>
								<div className='absolute inset-0 bg-black/20'></div>
							</div>
							<div className='p-6'>
								<h2 className='text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors'>
									{service.title}
								</h2>
								<p className='text-gray-600 text-sm leading-relaxed'>
									{service.description}
								</p>
								<div className='mt-4 text-indigo-600 font-medium text-sm group-hover:text-indigo-700'>
									Подробнее →
								</div>
							</div>
						</Link>
					))}
				</section>

				<section className='bg-white rounded-lg p-8 shadow-sm mb-8'>
					<h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
						Почему выбирают наших мастеров?
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='text-2xl'>⚡</span>
							</div>
							<h3 className='font-semibold text-gray-800 mb-2'>
								Быстрый выезд
							</h3>
							<p className='text-sm text-gray-600'>
								Приедем в течение 30 минут
							</p>
						</div>
						<div className='text-center'>
							<div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='text-2xl'>🔧</span>
							</div>
							<h3 className='font-semibold text-gray-800 mb-2'>Опыт работы</h3>
							<p className='text-sm text-gray-600'>Более 5 лет на рынке</p>
						</div>
						<div className='text-center'>
							<div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='text-2xl'>✅</span>
							</div>
							<h3 className='font-semibold text-gray-800 mb-2'>Гарантия</h3>
							<p className='text-sm text-gray-600'>На все виды работ</p>
						</div>
						<div className='text-center'>
							<div className='w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<span className='text-2xl'>💰</span>
							</div>
							<h3 className='font-semibold text-gray-800 mb-2'>Честные цены</h3>
							<p className='text-sm text-gray-600'>Без скрытых доплат</p>
						</div>
					</div>
				</section>

				<DashboardOrder />
			</main>
		</>
	)
}
