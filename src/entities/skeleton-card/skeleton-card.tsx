import { Skeleton } from '@/shared/ui/skeleton'

export function SkeletonCard() {
	return (
		<div className='flex flex-col w-full'>
			{/* Скелетон для изображения */}
			<Skeleton className='h-[300px] w-full rounded-t-xl' />

			{/* Скелетон для контента */}
			<div className='p-6 sm:p-8 space-y-4'>
				{/* Заголовок */}
				<Skeleton className='h-8 w-3/4 rounded-lg' />

				{/* Описание: несколько строк */}
				<div className='space-y-2'>
					<Skeleton className='h-5 w-full rounded-md' />
					<Skeleton className='h-5 w-5/6 rounded-md' />
					<Skeleton className='h-5 w-4/6 rounded-md' />
				</div>

				{/* Скелетон для кнопки и иконки */}
				<div className='flex justify-between items-center pt-4 mt-auto'>
					<Skeleton className='h-5 w-1/4 rounded-md' />
					<Skeleton className='h-10 w-1/3 rounded-full' />
				</div>
			</div>
		</div>
	)
}
