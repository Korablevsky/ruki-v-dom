import { CardMainPage } from '@/entities/card-main-page/card-main-page'
import { DashboardOrder } from '@/widgets/dashboard-order/dashboard-order'
import { PriceTarget } from '@/widgets/price-target/price-target'
import { WhyMaster } from '@/widgets/why-master/why-master'

export default function MasterNaChasPage() {
	return (
		<main className='py-10'>
			<h1 className='text-2xl font-bold text-center text-indigo-700 mb-6'>
				Мастер на час
			</h1>

			<section className='flex flex-col gap-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<CardMainPage
						image='/png/page-master/santeh.webp'
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
