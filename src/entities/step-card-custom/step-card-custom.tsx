import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../shared/ui/card'

type StepCardProps = {
	title: string
	description: string | ReactNode
	number: number
	className?: string
}

export function StepCardCustom(props: StepCardProps) {
	const { title, description, number, className } = props
	return (
		<Card
			className={cn(
				'flex flex-row overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow gap-0',
				className
			)}
		>
			<CardContent className='p-2 sm:p-3 md:p-4 flex items-center justify-center'>
				<div className='text-4xl sm:text-5xl md:text-6xl font-bold flex items-center justify-center text-indigo-600/90 bg-indigo-100/80 rounded-md w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20'>
					{number}
				</div>
			</CardContent>
			<div className='flex-1'>
				<CardHeader className='p-2 sm:p-3 md:p-4 pb-0 sm:pb-0.5 md:pb-1'>
					<CardTitle className='text-base sm:text-lg md:text-lg text-indigo-700 font-medium'>
						{title}
					</CardTitle>
					<CardDescription className='text-xs sm:text-sm md:text-sm text-muted-foreground'>
						{description}
					</CardDescription>
				</CardHeader>
			</div>
		</Card>
	)
}
