import { Button } from '@/shared/ui/button'
import Image from 'next/image'

export function DashboardOrder() {
	return (
		<section className='py-8 px-6 flex flex-col lg:flex-row lg:justify-between items-center gap-6 bg-gradient-to-br from-blue-500/90 via-indigo-500/80 to-purple-500/70 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm'>
			<div className='flex flex-col items-center lg:items-start lg:max-w-md gap-6'>
				<h2 className='text-2xl font-extrabold text-white drop-shadow-md'>
					Вызов мастера на дом
				</h2>
				<div className='text-center lg:text-left space-y-3'>
					<p className='text-white/90 text-lg font-medium'>
						Профессиональный мастер приедет к вам в течение часа
					</p>
					<p className='text-2xl font-bold text-white drop-shadow-md'>
						от 500 ₽
					</p>
				</div>
				<Button
					variant='outline'
					className='w-full bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer'
				>
					Вызвать мастера
				</Button>
			</div>
			<div className='relative w-full md:w-[350px] h-96 transform hover:scale-105 transition-transform duration-300 order-first lg:order-last'>
				<Image
					src='/png/page-master/page-master.webp'
					alt='Мастер на час'
					fill
					className='object-cover object-top drop-shadow-2xl [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.4))]'
					priority
				/>
			</div>
		</section>
	)
}
