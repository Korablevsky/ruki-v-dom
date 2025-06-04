import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { Help } from '@/widgets/help/help'
import { HomeScreen } from '@/widgets/home-screen/home-screen'
import { HowWork } from '@/widgets/how-work/how-work'
import { WelcomeWidget } from '@/widgets/welcome-widget/welcome-widget'
import { WhyUs } from '@/widgets/why-us/why-us'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
	title: 'Руки в дом | Сантехник и муж на час в Оренбурге',
	description:
		'Установка и ремонт сантехники в Оренбурге: краны, унитазы, ванны от 500 ₽. Профессиональные сантехнические услуги и муж на час.',
	keywords:
		'сантехник, муж на час, ремонт сантехники, установка сантехники, Оренбург',
	openGraph: {
		title: 'Руки в дом | Сантехник и муж на час в Оренбурге',
		description:
			'Установка и ремонт сантехники в Оренбурге: краны, унитазы, ванны от 500 ₽. Профессиональные сантехнические услуги и муж на час.',
		url: 'https://rukiwdom.ru',
		siteName: 'Руки в дом',
		images: [
			{
				url: 'https://rukiwdom.ru/favicon.png',
				width: 800,
				height: 600,
			},
		],
		locale: 'ru_RU',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: 'https://rukiwdom.ru',
	},
}

export default function Home() {
	return (
		<>
			<Script
				id='schema-org'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'LocalBusiness',
						name: 'Руки в дом',
						description:
							'Установка и ремонт сантехники в Оренбурге: краны, унитазы, ванны от 500 ₽. Профессиональные сантехнические услуги и муж на час.',
						image: 'https://rukiwdom.ru/favicon.png',
						address: {
							'@type': 'PostalAddress',
							addressLocality: 'Оренбург',
							addressRegion: 'Оренбургская область',
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: '51.7727',
							longitude: '55.1007',
						},
						url: 'https://rukiwdom.ru',
						telephone: '+79534574099',
						priceRange: 'от 500 ₽',
						openingHoursSpecification: [
							{
								'@type': 'OpeningHoursSpecification',
								dayOfWeek: [
									'Monday',
									'Tuesday',
									'Wednesday',
									'Thursday',
									'Friday',
								],
								opens: '08:00',
								closes: '20:00',
							},
							{
								'@type': 'OpeningHoursSpecification',
								dayOfWeek: ['Saturday', 'Sunday'],
								opens: '09:00',
								closes: '18:00',
							},
						],
						sameAs: [
							'https://vk.com/rukiwdom',
							'https://t.me/rukiwdom',
							'https://instagram.com/rukiwdom',
						],
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.8',
							reviewCount: '127',
							bestRating: '5',
							worstRating: '1',
						},
						review: [
							{
								'@type': 'Review',
								reviewRating: {
									'@type': 'Rating',
									ratingValue: '5',
								},
								author: {
									'@type': 'Person',
									name: 'Александр',
								},
								datePublished: '2024-03-15',
								reviewBody:
									'Отличный сервис, быстро и качественно установили новую сантехнику.',
							},
						],
						hasOfferCatalog: {
							'@type': 'OfferCatalog',
							name: 'Услуги',
							itemListElement: [
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Установка сантехники',
										description:
											'Профессиональная установка кранов, смесителей, унитазов и ванн в Оренбурге',
										url: 'https://rukiwdom.ru/services/sanitehnik',
										priceSpecification: {
											'@type': 'PriceSpecification',
											price: 500,
											priceCurrency: 'RUB',
										},
									},
								},
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Ремонт сантехники',
										description:
											'Срочный ремонт протечек, засоров и неисправностей сантехники в Оренбурге',
										url: 'https://rukiwdom.ru/services/sanitehnik',
										priceSpecification: {
											'@type': 'PriceSpecification',
											price: 800,
											priceCurrency: 'RUB',
										},
									},
								},
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Муж на час',
										description:
											'Мелкий бытовой ремонт и установка техники в Оренбурге',
										url: 'https://rukiwdom.ru/services/master-na-chas ',
										priceSpecification: {
											'@type': 'PriceSpecification',
											price: 1000,
											priceCurrency: 'RUB',
										},
									},
								},
								{
									'@type': 'Offer',
									itemOffered: {
										'@type': 'Service',
										name: 'Сборка мебели',
										description: 'Сборка мебели в Оренбурге',
										url: 'https://rukiwdom.ru/services/sborka-mebeli',
										priceSpecification: {
											'@type': 'PriceSpecification',
											price: 1000,
											priceCurrency: 'RUB',
										},
									},
								},
							],
						},
					}),
				}}
			/>
			<WelcomeWidget />
			<HomeScreen />
			{/* <CarouselCustom /> */}

			<WhyUs />
			<HowWork />
			<Help />
			<DashboardOrder />
		</>
	)
}
