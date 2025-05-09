import Link from 'next/link'

type MenuItemProps = {
	href: string
	title: string
	icon: React.ReactNode
	onClick?: () => void
}

export function MenuItem(props: MenuItemProps) {
	const { href, title, icon, onClick } = props
	return (
		<Link
			href={href}
			className='flex items-center bg-indigo-50 p-2 rounded-md gap-2'
			onClick={onClick}
		>
			<div className='w-10 h-10 bg-indigo-200 text-indigo-600 rounded-md flex items-center justify-center'>
				{icon}
			</div>
			<span className='text-gray-600 font-medium'>{title}</span>
		</Link>
	)
}
