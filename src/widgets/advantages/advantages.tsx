import { CardCustom } from '@/entities/card-custom/card-custom'
import { ChartNoAxesCombined } from 'lucide-react'

export function Advantages() {
	return (
		<section>
			<h2 className='text-xl text-indigo-700 font-bold mb-4'>
				Преимущества работы с нами:
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<CardCustom
					title='Стабильный доход'
					description='Работай и получай стабильный доход'
					icon={<ChartNoAxesCombined />}
				/>
				<CardCustom
					title=''
					description='Работай и получай стабильный доход'
					icon={<ChartNoAxesCombined />}
				/>
			</div>
		</section>
	)
}
