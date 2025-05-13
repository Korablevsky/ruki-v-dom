import { cn } from '@/shared/lib/utils'
import Image from 'next/image'

type CardMainPageProps = {
	image: string
	title: string
	description: string
	bgColor?: string
}
export function CardMainPage(props: CardMainPageProps) {
	const { image, title, description, bgColor } = props
	return (
		<div className='relative -mx-4  p-2 shadow-lg'>
			<div className={cn( `absolute inset-0 bg-gradient-to-br from-blue-500/90 to-indigo-600/90 rounded-md blur-2xl`, bgColor)}></div>
			<div className='relative max-w-4xl mx-auto'>
				<div className='flex justify-center'>
					<Image
						src={image}
						alt={title}
						width={400}
						height={400}
						className='relative rounded-lg drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]'
					/>
				</div>
				<div className='absolute bottom-0 left-0 right-0 p-6'>
					<div className='bg-gradient-to-t from-indigo-800/70  to-indigo-800/90 rounded-md md:w-[400px] md:mx-auto p-4'>
						<h3 className='text-xl font-semibold mb-2 text-white'>{title}</h3>
						<p className='text-sm text-white'>{description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
