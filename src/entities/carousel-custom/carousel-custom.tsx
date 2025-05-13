'use client'

import { Button } from '@/shared/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { EmblaCarouselType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function CarouselCustom() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
	const [isLargeScreen, setIsLargeScreen] = useState(false)

	// Проверка размера экрана
	useEffect(() => {
		const checkScreenSize = () => {
			setIsLargeScreen(window.innerWidth >= 1024) // lg breakpoint
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	const onApiChange = useCallback((api: EmblaCarouselType | undefined) => {
		if (api) setEmblaApi(api)
	}, [])

	const plugin = useMemo(
		() =>
			Autoplay({
				delay: 5000,
				stopOnInteraction: false,
			}),
		[]
	)

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi || isLargeScreen) return
		onSelect()
		emblaApi.on('select', onSelect)
		return () => {
			emblaApi.off('select', onSelect)
		}
	}, [emblaApi, onSelect, isLargeScreen])

	// Определяем текущий источник изображения в зависимости от выбранного индекса
	const currentImageSrc = useMemo(() => {
		switch (selectedIndex) {
			case 0:
				return '/png/main/master-na-chas.png'
			case 1:
				return '/png/main/muj-na-chas.png'
			case 2:
				return '/png/main/sborshik-mebeli.png'
			default:
				return '/png/main/master-na-chas.png'
		}
	}, [selectedIndex])

	// Данные для карточек
	const cardData = [
		{
			image: '/png/main/master-na-chas.png',
			title: 'Мастер на час',
			description: 'Профессиональная помощь в решении бытовых задач',
			link: '/services/master-na-chas',
		},
		{
			image: '/png/main/muj-na-chas.png',
			title: 'Сантехник',
			description:
				'Услуги по ремонту и обслуживанию водопровода, канализации и сантехники',
			link: '/services/sanitehnik',
		},
		{
			image: '/png/main/sborshik-mebeli.png',
			title: 'Сборщик мебели',
			description: 'Услуги по сборке и установке мебели',
			link: '/services/sborshik-mebeli',
		},
	]

	// Компонент карточки для отображения на больших экранах
	const ServiceCard = ({ data }: { data: (typeof cardData)[0] }) => (
		<div className='w-full h-[300px] sm:h-[400px] relative rounded-lg overflow-hidden group'>
			<Link href={data.link}>
				<Image
					className='w-full h-full object-cover transition-all duration-300 group-hover:scale-105 '
					src={data.image}
					height={400}
					width={400}
					alt={data.title}
			/>
			{/* Затемнение изображения */}
			<div className='absolute inset-0 bg-black/20 md:bg-black/40 transition-opacity duration-300 md:group-hover:bg-black/10'></div>
			{/* Градиент снизу для лучшей читаемости */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end items-center text-white p-4'>
				<div className='flex flex-col items-center justify-end h-full pb-8 '>
					<h2 className='text-xl sm:text-2xl font-bold mb-4'>{data.title}</h2>
					<Button
						className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6  rounded-full transition-all duration-200 transform hover:scale-105 '
						
					>
						Заказать услугу
					</Button>
				</div>
			</div>
			</Link>
		</div>
	)

	return (
		<div className='w-full overflow-hidden relative'>
			{/* Фоновое размытое изображение для боковых панелей */}
			<div
				className='absolute inset-0 -z-10'
				style={{
					backgroundImage: `url(${currentImageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					filter: 'blur(25px) brightness(0.7)',
					transform: 'scale(1.1)', // Немного увеличиваем, чтобы избежать появления краев при размытии
				}}
			/>

			{/* Внешний контейнер с фоном */}
			<div className='flex justify-center w-full'>
				{/* Центральный контейнер с ограниченной шириной */}
				<div
					className='w-full max-w-5xl relative overflow-hidden'
					style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
				>
					{/* Для больших экранов - показываем все три карточки */}
					{isLargeScreen ? (
						<div className='grid grid-cols-3 gap-4 p-4'>
							{cardData.map((card, index) => (
								<ServiceCard key={index} data={card} />
							))}
						</div>
					) : (
						<>
							{/* Градиентные боковые эффекты для плавного перехода */}
							<div
								className='absolute top-0 bottom-0 left-0 w-32 pointer-events-none z-10'
								style={{
									background:
										'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
								}}
							></div>
							<div
								className='absolute top-0 bottom-0 right-0 w-32 pointer-events-none z-10'
								style={{
									background:
										'linear-gradient(to left, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
								}}
							></div>

							<Carousel
								opts={{
									loop: true,
								}}
								plugins={[plugin]}
								setApi={onApiChange}
							>
								<CarouselContent>
									{cardData.map((card, index) => (
										<CarouselItem key={index}>
											<div className='w-full h-[300px] sm:h-[500px] md:h-[700px] relative group'>
												<Link href={card.link}>
													<Image
														className='w-full h-full object-cover transition-all duration-300 brightness-110 md:brightness-100 md:group-hover:brightness-110'
														src={card.image}
														height={700}
														width={1200}
														alt={card.title}
													/>
													{/* Затемнение изображения */}
													<div className='absolute inset-0 bg-black/20 md:bg-black/40 transition-opacity duration-300 md:group-hover:bg-black/30'></div>
													<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end items-center text-white p-4 sm:p-6 pb-8 sm:pb-12'>
														<div className='flex flex-col items-center mb-6 justify-end h-3/5'>
															<h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>
																{card.title}
															</h2>
															<Button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-all duration-200 transform hover:scale-105'>
																Заказать услугу
															</Button>
														</div>
													</div>
												</Link>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
							<div className='absolute bottom-4 bg-gray-50 w-fit mx-auto rounded-full p-2 left-0 right-0 flex justify-center gap-2 z-10'>
								{[0, 1, 2].map(index => (
									<button
										key={index}
										className={`w-2 h-2 rounded-full transition-all duration-300 ${
											index === selectedIndex
												? 'bg-indigo-600 w-6'
												: 'bg-gray-300 hover:bg-gray-400'
										}`}
										onClick={() => emblaApi?.scrollTo(index)}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
