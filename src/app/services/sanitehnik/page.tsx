import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { PriceTarget } from '@/widgets/price-target/price-target'
import { WhyMaster } from '@/widgets/why-master/why-master'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '11111',
	description:
		'Руки в дом – Помогает найти специалистов, которые сделают работу быстро и качественно',
	icons: {
		icon: '/favicon.png',
	},
}

export default function SanitehnikPage() {
	return (
		<main className='py-10'>
		<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
			Сантехник
		</h1>

		<section className='flex flex-col gap-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<CardMainPage
					bgColor='bg-gradient-to-br from-teal-500/90 to-sky-600/90'
					image='/png/page-master/santehnik.webp'
					title='Быстрый и качественный ремонт'
					description='Доверьте свой дом профессионалам. Мастер выполнит работу оперативно и качественно.'
				/>
				<WhyMaster />
			</div>
			<PriceTarget />
			<DashboardOrder />
		</section>
	</main>
	)
}
