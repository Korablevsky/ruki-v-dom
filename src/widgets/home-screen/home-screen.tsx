'use client'
import { CardMaster } from '@/entities/card-master/card-master'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { type UseEmblaCarouselType } from 'embla-carousel-react'
import { useEffect, useRef, useState } from 'react'

type CarouselApi = UseEmblaCarouselType[1]

export function HomeScreen() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi | null>(null)
	const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const handleDotClick = (index: number) => {
		if (api) {
			api.scrollTo(index)
			setSelectedIndex(index)
		}
	}

	useEffect(() => {
		if (!api) return

		const onSelect = () => {
			setSelectedIndex(api.selectedScrollSnap())
		}

		api.on('select', onSelect)
		return () => {
			api.off('select', onSelect)
		}
	}, [api])

	useEffect(() => {
		if (!api) return

		const startAutoplay = () => {
			stopAutoplay()
			autoplayIntervalRef.current = setInterval(() => {
				api.scrollNext()
			}, 5000)
		}

		const stopAutoplay = () => {
			if (autoplayIntervalRef.current) {
				clearInterval(autoplayIntervalRef.current)
				autoplayIntervalRef.current = null
			}
		}

		startAutoplay()

		api.on('pointerDown', stopAutoplay)
		api.on('pointerUp', startAutoplay)

		return () => {
			stopAutoplay()
			api.off('pointerDown', stopAutoplay)
			api.off('pointerUp', startAutoplay)
		}
	}, [api])

	return (
		<section className='container mx-auto py-8 pb-16 lg:pb-8'>
			<div className='relative'>
				<Carousel
					opts={{
						loop: true,
						align: 'start',
					}}
					className='w-full'
					setApi={setApi}
				>
					<CarouselContent className='-ml-4'>
						<CarouselItem className='pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3'>
							<CardMaster
								href='/services/master-na-chas'
								title='Муж на час'
								description='Найдите профессионала для решения ваших задач быстро и безопасно'
								image='/png/page-master/santeh.webp'
								buttonText='Найти мастера'
								color='bg-gradient-to-br from-purple-500 to-indigo-600'
							/>
						</CarouselItem>
						<CarouselItem className='pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3'>
							<CardMaster
								href='/services/sanitehnik'
								title='Сантехник'
								description='Решение всех проблем с водой и водоотведением качественно и быстро'
								image='/png/page-master/santehnik.webp'
								buttonText='Найти мастера'
								color='bg-gradient-to-br from-purple-500 to-indigo-600'
							/>
						</CarouselItem>
						<CarouselItem className='pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3'>
							<CardMaster
								href='/services/sborka-mebeli'
								title='Сборка мебели'
								description='Сборка мебели любой сложности. От простых до сложных'
								image='/png/page-master/page-master.webp'
								buttonText='Найти мастера'
								color='bg-gradient-to-br from-purple-500 to-indigo-600'
							/>
						</CarouselItem>
					</CarouselContent>
					<div className='absolute -bottom-8 bg-gray-100 w-fit mx-auto rounded-full p-2 left-0 right-0 flex justify-center gap-2 z-10 lg:hidden shadow-md'>
						{[0, 1, 2].map(index => (
							<button
								key={index}
								onClick={() => handleDotClick(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === selectedIndex
										? 'bg-indigo-600 w-6'
										: 'bg-gray-300 hover:bg-gray-400'
								}`}
							/>
						))}
					</div>
				</Carousel>
			</div>
		</section>
	)
}
