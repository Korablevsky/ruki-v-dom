import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
	title: '11111',
	description:
		'Руки в дом – Помогает найти специалистов, которые сделают работу быстро и качественно',
	icons: {
		icon: '/favicon.png',
	},
}

export default function ContactsPage() {
	return (
		<main className='  py-10 '>
			<Script
				id='webpage-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: 'Контакты',
						description: 'Описание страницы',
						url: 'https://rukivdom.ru/contacts',
					}),
				}}
			/>
			<h1 className='text-2xl font-bold text-indigo-700 mb-6'>Контакты</h1>

			<div className='grid md:grid-cols-2 gap-8'>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-indigo-600 mb-4'>
						Свяжитесь с нами
					</h2>

					<div className='space-y-4'>
						<div>
							<p className='font-medium text-gray-700'>Телефон:</p>
							<p className='text-indigo-600'>+7 (XXX) XXX-XX-XX</p>
						</div>

						<div>
							<p className='font-medium text-gray-700'>Email:</p>
							<p className='text-indigo-600'>info@rukivdom.ru</p>
						</div>

						<div>
							<p className='font-medium text-gray-700'>Адрес:</p>
							<p className='text-gray-600'>г. Москва, ул. Примерная, д. 123</p>
						</div>

						<div>
							<p className='font-medium text-gray-700'>Часы работы:</p>
							<p className='text-gray-600'>Пн-Пт: 9:00 - 20:00</p>
							<p className='text-gray-600'>Сб-Вс: 10:00 - 18:00</p>
						</div>
					</div>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-indigo-600 mb-4'>
						Напишите нам
					</h2>

					<div className='flex gap-4'>
						<Link href='https://t.me/korablevsky'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0 0 48 48'
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
						<Link href='https://wa.me/79534574099'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0,0,256,256'
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

						<Link href='https://vk.com' target='_blank'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								x='0px'
								y='0px'
								width='48'
								height='48'
								viewBox='0 0 48 48'
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
				</div>
			</div>
		</main>
	)
}
