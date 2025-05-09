import { CardCustom } from '@/entities/card-custom/card-custom'
import { MessageSquareText, RussianRuble, ShieldCheck, Zap } from 'lucide-react'

export function WhyUs() {
	return (
		<section className='flex flex-col gap-3 md:gap-4 lg:gap-6 py-4 md:py-6'>
			<h2 className='text-xl md:text-2xl lg:text-3xl text-indigo-700 font-bold text-center mb-1 md:mb-2 lg:mb-4'>
				Почему выбирают нас
			</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6'>
				<CardCustom
					title='Индивидуальный подход'
					description='Учитываем ваши пожелания, бюджет и сроки'
					icon={<MessageSquareText />}
					className='h-full'
				/>
				<CardCustom
					title='Быстрый выезд'
					description='Мастер приедет в течение часа и оперативно решит задачу'
					icon={<Zap />}
					className='h-full'
				/>
				<CardCustom
					title='Прозрачные цены'
					description='Четкий прайс, стоимость согласовываем заранее'
					icon={<RussianRuble />}
					className='h-full'
				/>
				<CardCustom
					title='Проверенные мастера'
					description='Профессионалы с опытом и сертификатами гарантируют качество работ'
					icon={<ShieldCheck />}
					className='h-full'
				/>
			</div>
		</section>
	)
}
