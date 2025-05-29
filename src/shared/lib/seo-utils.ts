import type { Metadata } from 'next'

interface SEOConfig {
	title: string
	description: string
	keywords?: string
	url: string
	image?: string
	type?: 'website' | 'article' | 'service'
}

export function generateMetadata(config: SEOConfig): Metadata {
	const baseUrl = 'https://rukiwdom.ru'
	const fullUrl = `${baseUrl}${config.url}`
	const defaultImage = '/favicon.png'

	return {
		title: config.title,
		description: config.description,
		keywords: config.keywords,
		openGraph: {
			title: config.title,
			description: config.description,
			url: fullUrl,
			images: [
				{
					url: config.image || defaultImage,
					width: 1200,
					height: 630,
					alt: config.title,
				},
			],
			type: config.type === 'service' ? 'website' : config.type || 'website',
			siteName: 'Руки в дом',
			locale: 'ru_RU',
		},
		twitter: {
			card: 'summary_large_image',
			title: config.title,
			description: config.description,
			images: [config.image || defaultImage],
		},
		alternates: {
			canonical: fullUrl,
		},
		robots: 'index, follow',
	}
}

export function generateStructuredData(config: {
	type: 'WebPage' | 'Service' | 'Organization'
	name: string
	description: string
	url: string
	breadcrumbs?: Array<{ name: string; url: string }>
	services?: Array<{ name: string; description: string }>
}) {
	const baseStructure = {
		'@context': 'https://schema.org',
		'@type': config.type,
		name: config.name,
		description: config.description,
		url: config.url,
	}

	if (config.breadcrumbs) {
		return {
			...baseStructure,
			breadcrumb: {
				'@type': 'BreadcrumbList',
				itemListElement: config.breadcrumbs.map((item, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: item.name,
					item: item.url,
				})),
			},
		}
	}

	if (config.services && config.type === 'Service') {
		return {
			...baseStructure,
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: 'Каталог услуг',
				itemListElement: config.services.map(service => ({
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: service.name,
						description: service.description,
					},
				})),
			},
		}
	}

	return baseStructure
}

export const defaultSEOConfig = {
	siteName: 'Руки в дом',
	baseUrl: 'https://rukiwdom.ru',
	defaultTitle: 'Руки в дом - Услуги мастеров в Оренбурге',
	defaultDescription:
		'Найдите проверенных мастеров для решения бытовых задач в Оренбурге. Быстро, качественно, недорого.',
	defaultKeywords:
		'мастер на час, сантехник, сборка мебели, ремонт, бытовые услуги, Оренбург',
}
