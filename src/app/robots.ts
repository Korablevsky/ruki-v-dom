import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	const baseUrl = 'https://rukiwdom.ru'

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/_next/', '/api/'],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: "rukiwdom.ru",
	}
}
