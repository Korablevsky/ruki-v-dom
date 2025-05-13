import { AlarmClockCheck, GraduationCap, ThumbsUp } from 'lucide-react'

import { CardCustom } from '@/entities/card-custom/card-custom'
import { ShieldCheck } from 'lucide-react'

export  function WhyMaster() {
	return (
		<section className='flex flex-col gap-3 md:gap-4 lg:gap-6 py-4 md:py-0'>
			<h2 className='md:mt-4 text-xl font-bold text-center text-indigo-700 mb-2'>
				Почему лучше вызвать мастера?
			</h2>

			<div className='gap-3 grid grid-cols-1'>
				<CardCustom
					title='Безопасность'
					description='Профессионал минимизирует риски при работе с техникой или системами.'
					icon={<ShieldCheck />}
					className='h-full'
				/>
				<CardCustom
					title='Экономия времени'
					description='Мастер быстро решает задачу, освобождая вас для других дел.'
					icon={<AlarmClockCheck />}
					className='h-full'
				/>
				<CardCustom
					title='Профессиональный подход'
					description='Опыт и инструменты мастера обеспечивают качественный результат.'
					icon={<ThumbsUp />}
					className='h-full'
				/>
				<CardCustom
					title='Универсальность'
					description='Один мастер справится с разными задачами, от ремонта до установки.'
					icon={<GraduationCap />}
					className='h-full'
				/>
			</div>
		</section>
	)
}
