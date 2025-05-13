import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type CardMasterProps = {
	href: string
	title: string
	description: string
	image: string
	buttonText: string
	color: string
	buttonColor?: string
	buttonTextColor?: string
	icon?: React.ReactNode
	iconText?: string
}

export function CardMaster(props: CardMasterProps) {
	return (
		<Link href={props.href} className='group'>
			<div
				className={cn(
					'bg-gradient-to-br rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform h-full hover:bg-gradient-to-tl pt-4 flex flex-col',
					props.color
				)}
			>
				<div className='relative h-[400px] md:h-72 lg:h-80 transition-transform duration-300 md:group-hover:scale-105'>
					<Image
						src={props.image}
						alt='Клиент'
						fill
						className='object-cover lg:object-contain object-top lg:object-[center_top] '
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
						priority
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent'></div>
				</div>
				<div className='p-6 sm:p-8 text-white flex flex-col flex-grow'>
					<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
						{props.title}
					</h2>
					<p className='text-blue-100 mb-4 sm:mb-6 text-base sm:text-lg'>
						{props.description}
					</p>
					<div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 mt-auto'>
						{(props.icon || props.iconText) && (
							<span className='flex items-center gap-2 text-sm sm:text-base'>
								{props.icon}
								{props.iconText}
							</span>
						)}
						<Button
							className={cn(
								'bg-white text-base text-indigo-600 font-medium py-2 px-6 rounded-full hover:bg-purple-600 transition-colors duration-300 w-full text-center hover:text-white cursor-pointer',
								props.buttonColor,
								!props.icon && !props.iconText && 'lg:w-full',
								(props.icon || props.iconText) && 'lg:w-auto'
							)}
							variant='outline'
						>
							{props.buttonText}
						</Button>
					</div>
				</div>
			</div>
		</Link>
	)
}
