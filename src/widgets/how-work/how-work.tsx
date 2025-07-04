import { StepCardCustom } from '@/entities/step-card-custom/step-card-custom'

export function HowWork() {
	return (
		<section className='flex flex-col gap-4 py-6 md:py-10 -mx-4 bg-gradient-to-tl from-purple-500 to-indigo-600'>
			<h2 className='text-xl md:text-2xl lg:text-3xl text-white font-bold text-center mb-1 md:mb-2 lg:mb-4'>
				Как мы работаем
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6 px-3 md:px-4 lg:px-6'>
				<StepCardCustom
					title='Свяжитесь с нами'
					description={
						<>
							Позвоните или оставьте заявку на сайте с описанием вашей проблемы
						</>
					}
					number={1}
					className='h-full'
				/>
				<StepCardCustom
					title='Выезд мастера'
					description='Мастер приедет в течение часа и проведет диагностику'
					number={2}
					className='h-full'
				/>

				<StepCardCustom
					title='Выполняем работу'
					description='Выполним работу в течение 2-3 часов'
					number={3}
					className='h-full'
				/>
				<StepCardCustom
					title='Оплата услуги'
					description='Мастер показывает вам результат работы и вы оплачиваете ее'
					number={4}
					className='h-full'
				/>
			</div>
		</section>
	)
}
