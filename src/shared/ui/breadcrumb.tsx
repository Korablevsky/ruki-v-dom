import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbProps {
	items: BreadcrumbItem[]
	className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
	return (
		<nav
			aria-label='Хлебные крошки'
			className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}
		>
			<Link
				href='/'
				className='flex items-center hover:text-indigo-600 transition-colors'
				aria-label='Главная страница'
			>
				<Home className='w-4 h-4' />
			</Link>

			{items.map((item, index) => (
				<Fragment key={index}>
					<ChevronRight className='w-4 h-4 text-gray-400' />
					{item.href ? (
						<Link
							href={item.href}
							className='hover:text-indigo-600 transition-colors'
						>
							{item.label}
						</Link>
					) : (
						<span className='text-gray-800 font-medium'>{item.label}</span>
					)}
				</Fragment>
			))}
		</nav>
	)
}
