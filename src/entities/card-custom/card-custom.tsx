import { cn } from '@/shared/lib/utils'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'

type CardCustomProps = {
	title: string
	description: string
	icon: React.ReactNode
	className?: string
}

export function CardCustom(props: CardCustomProps) {
	const { title, description, icon, className } = props
	return (
		<Card
			className={cn(
				'flex flex-row overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow gap-0',
				className
			)}
		>
			<CardContent className='p-2 sm:p-3 md:p-4 flex items-center justify-center'>
				<div className='h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600'>
					{icon}
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
				{/* <CardFooter className="p-4 pt-1 flex justify-end">
			<span className="text-sm text-muted-foreground">12 товаров</span>
		  </CardFooter> */}
			</div>
		</Card>
	)
}
