import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Контакты - Руки в дом | Связаться с нами в Оренбурге',
	description:
		'Свяжитесь с нами для заказа услуг домашнего мастера в Оренбурге. Телефон: +7 (953) 457-40-99, email: info.rukiwdom@yandex.ru. Быстрый отклик и качественная работа.',
	keywords:
		'контакты руки в дом, домашний мастер Оренбург, телефон мастера, заказать услуги мастера, ремонт дома Оренбург',
	openGraph: {
		title: 'Контакты - Руки в дом | Связаться с нами в Оренбурге',
		description:
			'Свяжитесь с нами для заказа услуг домашнего мастера в Оренбурге. Быстрый отклик и качественная работа.',
		url: 'https://rukiwdom.ru/contacts',
		siteName: 'Руки в дом',
		locale: 'ru_RU',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'Контакты - Руки в дом | Связаться с нами в Оренбурге',
		description:
			'Свяжитесь с нами для заказа услуг домашнего мастера в Оренбурге.',
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/contacts',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	icons: {
		icon: '/favicon.png',
	},
}

export default function ContactsPage() {
	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'Руки в дом',
		description: 'Услуги домашнего мастера в Оренбурге',
		url: 'https://rukiwdom.ru',
		telephone: '+79534574099',
		email: 'info.rukiwdom@yandex.ru',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'ул. Новая, д. 4',
			addressLocality: 'Оренбург',
			addressRegion: 'Оренбургская область',
			addressCountry: 'RU',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '51.7727',
			longitude: '55.0988',
		},
		openingHours: ['Mo-Fr 09:00-20:00', 'Sa-Su 10:00-18:00'],
		priceRange: '$$',
		areaServed: {
			'@type': 'City',
			name: 'Оренбург',
		},
		serviceArea: {
			'@type': 'City',
			name: 'Оренбург',
		},
		sameAs: [
			'https://t.me/korablevsky',
			'https://wa.me/79534574099',
			'https://vk.com',
		],
	}

	const contactPageSchema = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: 'Контакты - Руки в дом',
		description:
			'Страница контактов компании Руки в дом - услуги домашнего мастера в Оренбурге',
		url: 'https://rukiwdom.ru/contacts',
		mainEntity: {
			'@type': 'LocalBusiness',
			name: 'Руки в дом',
			telephone: '+79534574099',
			email: 'info.rukiwdom@yandex.ru',
		},
	}

	return (
		<main className='py-10' itemScope itemType='https://schema.org/ContactPage'>
			<Script
				id='organization-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema),
				}}
			/>
			<Script
				id='contact-page-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(contactPageSchema),
				}}
			/>

			<header className='mb-8'>
				<h1 className='text-3xl font-bold text-indigo-700 mb-4' itemProp='name'>
					Контакты - Руки в дом
				</h1>
				<p className='text-lg text-gray-600 max-w-3xl' itemProp='description'>
					Свяжитесь с нами для заказа услуг домашнего мастера в Оренбурге. Мы
					быстро отвечаем на запросы и готовы помочь с любыми домашними
					работами.
				</p>
			</header>

			<div className='grid md:grid-cols-2 gap-8'>
				<section
					className='bg-white p-6 rounded-lg shadow-md'
					itemScope
					itemType='https://schema.org/LocalBusiness'
				>
					<h2 className='text-xl font-semibold text-indigo-600 mb-4'>
						Наши контакты
					</h2>

					<div className='space-y-4'>
						<div
							itemProp='contactPoint'
							itemScope
							itemType='https://schema.org/ContactPoint'
						>
							<h3 className='font-medium text-gray-700'>Телефон:</h3>
							<Link
								href='tel:+79534574099'
								className='text-indigo-600 hover:text-indigo-800 transition-colors'
								itemProp='telephone'
								aria-label='Позвонить по номеру +7 (953) 457-40-99'
							>
								+7 (953) 457-40-99
							</Link>
							<meta itemProp='contactType' content='customer service' />
							<meta itemProp='areaServed' content='Оренбург' />
							<meta itemProp='availableLanguage' content='Russian' />
						</div>

						<div>
							<h3 className='font-medium text-gray-700'>Email:</h3>
							<Link
								href='mailto:info.rukiwdom@yandex.ru'
								className='text-indigo-600 hover:text-indigo-800 transition-colors'
								itemProp='email'
								aria-label='Написать на email info.rukiwdom@yandex.ru'
							>
								info.rukiwdom@yandex.ru
							</Link>
						</div>

						<div
							itemProp='address'
							itemScope
							itemType='https://schema.org/PostalAddress'
						>
							<h3 className='font-medium text-gray-700'>Адрес:</h3>
							<address className='text-gray-600 not-italic'>
								<span itemProp='addressLocality'>г. Оренбург</span>,
								<span itemProp='streetAddress'> ул. Новая, д. 4</span>
								<meta itemProp='addressRegion' content='Оренбургская область' />
								<meta itemProp='addressCountry' content='RU' />
							</address>
						</div>

						<div>
							<h3 className='font-medium text-gray-700'>Часы работы:</h3>
							<div className='text-gray-600'>
								<time itemProp='openingHours' dateTime='Mo-Fr 09:00-20:00'>
									Пн-Пт: 9:00 - 20:00
								</time>
								<br />
								<time itemProp='openingHours' dateTime='Sa-Su 10:00-18:00'>
									Сб-Вс: 10:00 - 18:00
								</time>
							</div>
						</div>

						<div>
							<h3 className='font-medium text-gray-700'>Зона обслуживания:</h3>
							<p className='text-gray-600' itemProp='areaServed'>
								Оренбург
							</p>
						</div>
					</div>
				</section>

				<section className='bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-indigo-600 mb-4'>
						Напишите нам в мессенджерах
					</h2>

					<p className='text-gray-600 mb-4'>
						Выберите удобный способ связи. Мы отвечаем быстро в любом
						мессенджере!
					</p>

					<div
						className='flex gap-4'
						role='list'
						aria-label='Социальные сети и мессенджеры'
					>
						<Link
							href='https://t.me/korablevsky'
							className='hover:scale-110 transition-transform'
							aria-label='Написать в Telegram'
							role='listitem'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0 0 48 48'
								aria-hidden='true'
							>
								<path
									fill='#29b6f6'
									d='M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z'
								></path>
								<path
									fill='#fff'
									d='M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z'
								></path>
								<path
									fill='#b0bec5'
									d='M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z'
								></path>
								<path
									fill='#cfd8dc'
									d='M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z'
								></path>
							</svg>
						</Link>

						<Link
							href='https://wa.me/79534574099'
							className='hover:scale-110 transition-transform'
							aria-label='Написать в WhatsApp'
							role='listitem'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0,0,256,256'
								aria-hidden='true'
							>
								<g
									fill='#1ab734'
									fillRule='nonzero'
									stroke='none'
									strokeWidth='1'
									strokeLinecap='butt'
									strokeLinejoin='miter'
									strokeMiterlimit='10'
									strokeDasharray=''
									strokeDashoffset='0'
									fontFamily='none'
									fontWeight='none'
									fontSize='none'
									textAnchor='none'
									style={{ mixBlendMode: 'normal' }}
								>
									<g transform='scale(10.66667,10.66667)'>
										<path d='M19.077,4.928c-1.886,-1.887 -4.394,-2.927 -7.066,-2.928c-5.506,0 -9.987,4.479 -9.989,9.985c-0.001,1.76 0.459,3.478 1.333,4.992l-1.355,5.023l5.233,-1.237c1.459,0.796 3.101,1.215 4.773,1.216h0.004c5.505,0 9.986,-4.48 9.989,-9.985c0.002,-2.669 -1.036,-5.178 -2.922,-7.066zM16.898,15.554c-0.208,0.583 -1.227,1.145 -1.685,1.186c-0.458,0.042 -0.887,0.207 -2.995,-0.624c-2.537,-1 -4.139,-3.601 -4.263,-3.767c-0.125,-0.167 -1.019,-1.353 -1.019,-2.581c0,-1.228 0.645,-1.832 0.874,-2.081c0.229,-0.25 0.499,-0.312 0.666,-0.312c0.166,0 0.333,0 0.478,0.006c0.178,0.007 0.375,0.016 0.562,0.431c0.222,0.494 0.707,1.728 0.769,1.853c0.062,0.125 0.104,0.271 0.021,0.437c-0.083,0.166 -0.125,0.27 -0.249,0.416c-0.125,0.146 -0.262,0.325 -0.374,0.437c-0.125,0.124 -0.255,0.26 -0.11,0.509c0.146,0.25 0.646,1.067 1.388,1.728c0.954,0.85 1.757,1.113 2.007,1.239c0.25,0.125 0.395,0.104 0.541,-0.063c0.146,-0.166 0.624,-0.728 0.79,-0.978c0.166,-0.25 0.333,-0.208 0.562,-0.125c0.229,0.083 1.456,0.687 1.705,0.812c0.25,0.125 0.416,0.187 0.478,0.291c0.062,0.103 0.062,0.603 -0.146,1.186z'></path>
									</g>
								</g>
							</svg>
						</Link>

						<Link
							href='https://vk.com'
							target='_blank'
							className='hover:scale-110 transition-transform'
							aria-label='Написать ВКонтакте'
							role='listitem'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0 0 48 48'
								aria-hidden='true'
							>
								<path
									fill='#1976d2'
									d='M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z'
								></path>
								<path
									fill='#fff'
									d='M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z'
								></path>
							</svg>
						</Link>
					</div>
				</section>
				<div className='mt-2 p-4 bg-white rounded-lg'>
					<h3 className='font-medium text-indigo-600 mb-2'>Быстрый отклик</h3>
					<p className='text-sm text-gray-600'>
						Мы отвечаем на сообщения в течение 15 минут в рабочее время. Для
						срочных вопросов лучше звонить по телефону.
					</p>
				</div>
			</div>
		</main>
	)
}
