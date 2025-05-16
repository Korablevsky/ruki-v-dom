import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://rukivdom.ru'

	// Основные страницы сайта
	const routes = ['', '/services', '/price', '/contacts', '/vacancies'].map(
		route => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: route === '' ? 1 : 0.8,
		})
	)

	return routes
}
