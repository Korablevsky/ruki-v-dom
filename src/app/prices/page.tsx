import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/shared/ui/accordion'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import { AccordionItem } from '@radix-ui/react-accordion'
import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

// SEO метаданные для страницы цен
export const metadata: Metadata = {
	title:
		'Цены на услуги мастера на час, сантехника, сборки мебели в Оренбурге | Руки в дом',
	description:
		'Актуальные цены на услуги мастера на час, сантехника и сборщика мебели в Оренбурге. Прозрачное ценообразование, без скрытых доплат. Заказать услуги от 300₽.',
	keywords:
		'цены мастер на час, стоимость сантехника, цены сборка мебели, прайс услуги Оренбург, тарифы ремонт',
	openGraph: {
		title:
			'Цены на услуги мастера на час, сантехника, сборки мебели в Оренбурге',
		description:
			'Актуальные цены на услуги мастера на час, сантехника и сборщика мебели в Оренбурге. Прозрачное ценообразование, без скрытых доплат.',
		url: 'https://rukiwdom.ru/prices',
		type: 'website',
		images: [
			{
				url: '/favicon.png',
				width: 1200,
				height: 630,
				alt: 'Цены на услуги Руки в дом',
			},
		],
	},
	alternates: {
		canonical: 'https://rukiwdom.ru/prices',
	},
}

const serviceCategories = [
	{
		id: 1,
		title: 'Мастер на час',
		services: [
			{ id: 1, name: 'Замена розетки/выключателя', unit: 'шт.', price: 350 },
			{ id: 2, name: 'Установка светильника', unit: 'шт.', price: 700 },
			{ id: 3, name: 'Сборка/разборка мебели', unit: 'час', price: 1000 },
			{ id: 4, name: 'Навес полок', unit: 'шт.', price: 500 },
			{ id: 5, name: 'Установка карнизов', unit: 'шт.', price: 600 },
			{ id: 6, name: 'Замена смесителя', unit: 'шт.', price: 800 },
			{ id: 7, name: 'Монтаж плинтуса', unit: 'м.п.', price: 300 },
			{ id: 8, name: 'Установка зеркала', unit: 'шт.', price: 900 },
			{ id: 9, name: 'Замена дверных ручек', unit: 'шт.', price: 400 },
			{ id: 10, name: 'Мелкий ремонт мебели', unit: 'услуга', price: 650 },
		],
	},
	{
		id: 2,
		title: 'Сантехник',
		services: [
			{ id: 1, name: 'Устранение течи', unit: 'точка', price: 1000 },
			{ id: 2, name: 'Замена смесителя', unit: 'шт.', price: 1200 },
			{ id: 3, name: 'Установка унитаза', unit: 'шт.', price: 2500 },
			{ id: 4, name: 'Установка ванны', unit: 'шт.', price: 3500 },
			{ id: 5, name: 'Установка душевой кабины', unit: 'шт.', price: 4500 },
			{ id: 6, name: 'Замена труб', unit: 'м.п.', price: 800 },
			{ id: 7, name: 'Установка полотенцесушителя', unit: 'шт.', price: 2000 },
			{ id: 8, name: 'Установка раковины', unit: 'шт.', price: 1800 },
			{ id: 9, name: 'Прочистка канализации', unit: 'услуга', price: 1500 },
			{ id: 10, name: 'Установка водонагревателя', unit: 'шт.', price: 3000 },
		],
	},
	{
		id: 3,
		title: 'Сборщик мебели',
		services: [
			{ id: 1, name: 'Сборка кухонного гарнитура', unit: 'п.м.', price: 2000 },
			{ id: 2, name: 'Сборка шкафа-купе', unit: 'шт.', price: 3000 },
			{ id: 3, name: 'Сборка кровати', unit: 'шт.', price: 1500 },
			{ id: 4, name: 'Сборка стола', unit: 'шт.', price: 1000 },
			{ id: 5, name: 'Сборка комода', unit: 'шт.', price: 1200 },
			{ id: 6, name: 'Сборка дивана', unit: 'шт.', price: 2500 },
			{ id: 7, name: 'Сборка детской мебели', unit: 'комплект', price: 3500 },
			{ id: 8, name: 'Сборка офисной мебели', unit: 'комплект', price: 4000 },
			{ id: 9, name: 'Навес шкафов', unit: 'шт.', price: 1800 },
			{ id: 10, name: 'Установка фурнитуры', unit: 'комплект', price: 800 },
		],
	},
]

// Генерация структурированных данных для цен
const generateStructuredData = () => {
	const services = serviceCategories.flatMap(category =>
		category.services.map(service => ({
			'@type': 'Service',
			name: service.name,
			description: `${service.name} в Оренбурге`,
			provider: {
				'@type': 'Organization',
				name: 'Руки в дом',
			},
			offers: {
				'@type': 'Offer',
				price: service.price,
				priceCurrency: 'RUB',
				priceSpecification: {
					'@type': 'UnitPriceSpecification',
					price: service.price,
					priceCurrency: 'RUB',
					unitText: service.unit,
				},
			},
		}))
	)

	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'Руки в дом',
		description:
			'Услуги мастера на час, сантехника и сборщика мебели в Оренбурге',
		url: 'https://rukiwdom.ru',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Оренбург',
			addressCountry: 'RU',
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Каталог услуг',
			itemListElement: services,
		},
		priceRange: '300-4500 RUB',
		areaServed: {
			'@type': 'City',
			name: 'Оренбург',
		},
	}
}

// Генерация структурированных данных для FAQ
const generateFAQStructuredData = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Почему цены указаны "от"?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Окончательная стоимость зависит от сложности работы, объема, необходимых материалов и времени выполнения. Мастер оценивает работу на месте и согласовывает финальную цену с вами.',
				},
			},
			{
				'@type': 'Question',
				name: 'Входят ли материалы в стоимость услуг?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Нет, указанные цены включают только работу мастера. Материалы оплачиваются отдельно. Мастер может помочь с выбором и закупкой необходимых материалов.',
				},
			},
			{
				'@type': 'Question',
				name: 'Есть ли минимальная стоимость заказа?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Да, минимальная стоимость выезда мастера составляет 1000 рублей в пределах города Оренбурга. За пределы города действует дополнительная плата за выезд.',
				},
			},
			{
				'@type': 'Question',
				name: 'Можно ли получить скидку при заказе нескольких услуг?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Да, при заказе комплекса работ мастер может предложить скидку. Обсудите это при оформлении заказа или свяжитесь с нами для уточнения деталей.',
				},
			},
		],
	}
}

export default function Price() {
	const structuredData = generateStructuredData()
	const faqStructuredData = generateFAQStructuredData()

	return (
		<>
			{/* Структурированные данные для SEO */}
			<Script
				id='price-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			{/* Структурированные данные для FAQ */}
			<Script
				id='faq-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>

			<main className='py-10'>
				{/* Хлебные крошки для SEO */}
				<nav aria-label='Хлебные крошки' className='mb-6'>
					<ol className='flex items-center space-x-2 text-sm text-gray-600'>
						<li>
							<Link
								href='/'
								className='hover:text-indigo-600 transition-colors'
							>
								Главная
							</Link>
						</li>
						<li className='text-gray-400'>/</li>
						<li className='text-gray-900 font-medium' aria-current='page'>
							Цены на услуги
						</li>
					</ol>
				</nav>

				<header className='mb-8'>
					<h1 className='text-3xl text-indigo-700 font-bold mb-4'>
						Цены на услуги в Оренбурге
					</h1>
					<p className='text-lg text-gray-700 leading-relaxed max-w-4xl'>
						Актуальные цены на услуги мастера на час, сантехника и сборщика
						мебели. Прозрачное ценообразование без скрытых доплат. Окончательная
						стоимость зависит от сложности работы и согласовывается с мастером.
					</p>
				</header>

				<section aria-label='Прайс-лист услуг'>
					<Accordion type='single' collapsible className='w-full space-y-2'>
						{serviceCategories.map(category => (
							<AccordionItem
								key={category.id}
								value={`item-${category.id}`}
								className='border rounded-lg px-4 bg-white shadow-sm'
							>
								<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
									<h2>{category.title}</h2>
								</AccordionTrigger>
								<AccordionContent className='text-sm text-muted-foreground'>
									<div className='overflow-x-auto'>
										<Table
											className='rounded-md'
											role='table'
											aria-label={`Цены на услуги: ${category.title}`}
										>
											<TableHeader className='sticky top-0 z-10'>
												<TableRow className='bg-indigo-50'>
													<TableHead className='w-full first:rounded-tl-lg bg-indigo-50'>
														<div className='flex cursor-pointer items-center text-blue-800'>
															Услуга
														</div>
													</TableHead>
													<TableHead className='bg-indigo-50'>
														<div className='flex cursor-pointer items-center justify-center font-medium text-center w-[60px] text-blue-800'>
															Ед. изм
														</div>
													</TableHead>
													<TableHead className='last:rounded-tr-md bg-indigo-50'>
														<div className='flex cursor-pointer justify-center items-center font-medium w-[100px] text-blue-800'>
															Цена
														</div>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{category.services.map((service, index) => (
													<TableRow
														key={service.id}
														className={`group cursor-pointer transition-colors duration-200 hover:bg-blue-50 ${
															index === category.services.length - 1
																? 'last:rounded-b-md'
																: ''
														}`}
													>
														<TableCell
															className={
																index === category.services.length - 1
																	? 'first:rounded-bl-md'
																	: ''
															}
														>
															{service.name}
														</TableCell>
														<TableCell className='text-center'>
															{service.unit}
														</TableCell>
														<TableCell
															className={`text-center ${
																index === category.services.length - 1
																	? 'last:rounded-br-md'
																	: ''
															}`}
														>
															<span
																itemProp='price'
																content={service.price.toString()}
															>
																от {service.price} ₽
															</span>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>

				{/* FAQ секция для SEO */}
				<section className='mt-12' aria-label='Часто задаваемые вопросы'>
					<h2 className='md:text-2xl text-xl font-bold text-indigo-700 mb-6 text-center'>
						Часто задаваемые вопросы о ценах
					</h2>

					<div className=' mx-auto space-y-4'>
						<Accordion type='single' collapsible className='w-full space-y-2'>
							<AccordionItem
								value='faq-1'
								className='border rounded-lg px-4 bg-white shadow-sm'
							>
								<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
									Почему цены указаны &ldquo;от&rdquo;?
								</AccordionTrigger>
								<AccordionContent className='text-sm text-gray-600'>
									<p>
										Окончательная стоимость зависит от сложности работы, объема,
										необходимых материалов и времени выполнения. Мастер
										оценивает работу на месте и согласовывает финальную цену с
										вами.
									</p>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value='faq-2'
								className='border rounded-lg px-4 bg-white shadow-sm'
							>
								<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
									Входят ли материалы в стоимость услуг?
								</AccordionTrigger>
								<AccordionContent className='text-sm text-gray-600'>
									<p>
										Нет, указанные цены включают только работу мастера.
										Материалы оплачиваются отдельно. Мастер может помочь с
										выбором и закупкой необходимых материалов.
									</p>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem
								value='faq-3'
								className='border rounded-lg px-4 bg-white shadow-sm'
							>
								<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
									Есть ли минимальная стоимость заказа?
								</AccordionTrigger>
								<AccordionContent className='text-sm text-gray-600'>
									<p>
										Да, минимальная стоимость выезда мастера составляет 1000
										рублей в пределах города Оренбурга. За пределы города
										действует дополнительная плата за выезд.
									</p>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</section>

				<footer className='mt-8'>
					<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
						<h3 className='text-lg font-semibold text-yellow-800 mb-2'>
							Важная информация о ценах
						</h3>
						<p className='text-sm text-yellow-700'>
							*Окончательная цена уточняется у мастера и может отличаться от
							указанной на сайте в зависимости от сложности работы, объема и
							дополнительных материалов.
						</p>
					</div>

					<div className='text-center'>
						<h3 className='text-xl font-semibold text-gray-800 mb-4'>
							Нужна консультация по ценам?
						</h3>
						<p className='text-gray-600 mb-4'>
							Свяжитесь с нами для получения точной стоимости услуг
						</p>
						<Link
							href='/contacts'
							className='inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium'
						>
							Связаться с нами
						</Link>
					</div>
				</footer>
			</main>
		</>
	)
}
