import { ModalOrderForm } from '@/features/telegram-message/modal-order-form'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'

export function WelcomeWidget() {
	return (
		<section className='flex flex-col gap-6 py-10 h-[600px] md:h-auto md:py-16 -mx-4 bg-gradient-to-br from-indigo-700  to-purple-800 shadow-lg relative overflow-hidden'>
			{/* Фоновое изображение, видимое только на маленьких экранах */}
			<div className='absolute  inset-0 w-full h-full opacity-65 md:hidden'>
				<Image
					src='/png/page-master/master-dashboard.webp'
					alt='Мастер за работой'
					className='w-full h-full object-center object-cover'
					height={400}
					width={400}
				/>
			</div>

			{/* Контент и изображение для планшетов и десктопов в flexbox-layout */}
			<div className='max-w-7xl mt-auto mx-auto px-4 sm:px-6 w-full flex flex-col md:flex-row items-center'>
				<div className='text-center md:text-left md:max-w-xl z-10 py-4 md:py-6 px-4 md:px-6 rounded-lg backdrop-blur-md bg-black/40 shadow-md'>
					<h2 className='text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6'>
						Профессиональные мастера для вашего дома
					</h2>
					<p className='text-white/90 max-w-2xl mx-auto md:mx-0 leading-relaxed text-base md:text-lg mb-6'>
						Быстрый выезд, прозрачные цены. Решим любые бытовые проблемы.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 max-w-xs sm:max-w-none mx-auto md:mx-0'>
						<Button
							variant='outline'
							className='bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 text-lg font-semibold py-6  rounded-md shadow-lg hover:shadow-xl cursor-pointer w-full sm:w-auto'
						>
							Позвонить
						</Button>
						<div className='w-full sm:w-auto'>
							<ModalOrderForm />
						</div>
					</div>
				</div>

				{/* Изображение мастера, видимое на средних и больших экранах */}
				<div className='hidden md:block md:w-3/5 lg:w-1/2 ml-auto'>
					<Image
						src='/png/page-master/master-dashboard.webp'
						alt='Мастер за работой'
						className='max-h-80 md:max-h-72 lg:max-h-96 object-contain ml-auto'
						width={400}
						height={400}
					/>
				</div>
			</div>
		</section>
	)
}
