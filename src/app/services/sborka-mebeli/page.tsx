import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { WhyMaster } from '@/widgets/why-master/why-master'
import { PriceTarget } from '@/widgets/price-target/price-target'

export default function SborkaMebelPage() {
	return (
		<main className='py-10'>
		<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
			Сборка мебели
		</h1>

		<section className='flex flex-col gap-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<CardMainPage
					bgColor='bg-gradient-to-br from-sky-500/90 to-violet-600/90'
					image='/png/page-master/master-dashboard.webp'
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
