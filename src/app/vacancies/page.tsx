import { CardMaster } from '@/entities/card-master/card-master'
import { Metadata } from 'next'
import { VacancyForm } from '../../features/telegram-message/vacancy-form'

export const metadata: Metadata = {
	title: 'Вакансии для мастеров - Руки в дом | Работа мастером на час',
	description:
		'Присоединяйтесь к команде мастеров "Руки в дом"! Стабильный доход, новые клиенты, работа мастером на час. Оставьте заявку и получайте заказы по ремонту и бытовым услугам.',
	keywords:
		'вакансии мастер, работа мастером, мастер на час вакансии, ремонт работа, бытовые услуги работа, мастер универсал вакансии',
	openGraph: {
		title: 'Вакансии для мастеров - Руки в дом',
		description:
			'Присоединяйтесь к команде мастеров! Стабильный доход и новые клиенты ждут вас.',
		type: 'website',
		locale: 'ru_RU',
		images: [
			{
				url: '/png/page-master/master-dashboard.webp',
				width: 1200,
				height: 630,
				alt: 'Работа мастером в команде Руки в дом',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Вакансии для мастеров - Руки в дом',
		description:
			'Присоединяйтесь к команде мастеров! Стабильный доход и новые клиенты ждут вас.',
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
	alternates: {
		canonical: '/vacancies',
	},
}

export default function Vacancies() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'JobPosting',
		title: 'Мастер на час',
		description:
			'Мы ищем опытных мастеров на час для выполнения заказов по ремонту и бытовым услугам. Работай и получай стабильный доход и новых клиентов!',
		hiringOrganization: {
			'@type': 'Organization',
			name: 'Руки в дом',
			sameAs: 'https://rukiwdom.ru',
		},
		jobLocation: {
			'@type': 'Place',
			addressLocality: 'Оренбург',
			addressCountry: 'RU',
		},
		employmentType: 'CONTRACTOR',
		workHours: 'Гибкий график',
		qualifications: 'Опыт работы мастером, навыки ремонта и бытовых услуг',
		responsibilities: 'Выполнение заказов по ремонту и бытовым услугам',
		benefits: 'Стабильный доход, новые клиенты, гибкий график работы',
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className='container mx-auto py-10'>
				<header className='mb-8'>
					<h1 className='text-3xl md:text-4xl font-bold text-indigo-700 text-center mb-4'>
						Вакансии для мастеров
					</h1>
					<p className='text-lg text-gray-600 text-center max-w-3xl mx-auto'>
						Присоединяйтесь к команде профессиональных мастеров &ldquo;Руки в
						дом&rdquo; и получайте стабильный доход
					</p>
				</header>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<article>
						<CardMaster
							// href='https://t.me/korablevsky'
							title='Присоединяйся к команде мастеров!'
							description='Мы ищем опытных мастеров на час для выполнения заказов по ремонту и бытовым услугам. Работай и получай стабильный доход и новых клиентов!'
							image='/png/page-master/master-dashboard.webp'
							// buttonText='Найти мастера'
							color='bg-gradient-to-br from-sky-500/90 to-blue-600/90'
						/>
					</article>

					<section className='flex flex-col justify-center'>
						<h2 className='md:text-2xl text:xl text-indigo-700 font-bold mb-6 text-center md:text-left'>
							Оставьте заявку чтобы получать заказы
						</h2>

						<VacancyForm />
					</section>
				</div>

				<section className='mt-16'>
					<h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
						Преимущества работы с нами
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='text-center p-6 bg-white rounded-lg shadow-md'>
							<h3 className='text-lg font-semibold text-indigo-600 mb-3'>
								Стабильный доход
							</h3>
							<p className='text-gray-600'>
								Регулярные заказы и справедливая оплата за выполненную работу
							</p>
						</div>
						<div className='text-center p-6 bg-white rounded-lg shadow-md'>
							<h3 className='text-lg font-semibold text-indigo-600 mb-3'>
								Гибкий график
							</h3>
							<p className='text-gray-600'>
								Работайте в удобное для вас время, выбирайте подходящие заказы
							</p>
						</div>
						<div className='text-center p-6 bg-white rounded-lg shadow-md'>
							<h3 className='text-lg font-semibold text-indigo-600 mb-3'>
								Новые клиенты
							</h3>
							<p className='text-gray-600'>
								Расширяйте клиентскую базу через нашу платформу
							</p>
						</div>
					</div>
				</section>

				{/* <Advantages /> */}
			</main>
		</>
	)
}
