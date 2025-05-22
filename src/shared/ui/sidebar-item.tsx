type SidebarItemProps = {
	href: string
	icon: React.ReactNode
	text: string
	handleNavigation: (href: string) => void
	isActive?: boolean
}

export function SidebarItem(props: SidebarItemProps) {
	const { href, icon, text, handleNavigation, isActive = false } = props

	return (
		<div
			className={`flex items-center ${
				isActive ? 'bg-indigo-100' : 'bg-indigo-50'
			} p-2 rounded-md gap-2 cursor-pointer`}
			onClick={() => handleNavigation(href)}
		>
			<div
				className={`w-10 h-10 ${
					isActive ? 'bg-indigo-300' : 'bg-indigo-200'
				} text-indigo-600 rounded-md flex items-center justify-center`}
			>
				{icon}
			</div>
			<span
				className={`${
					isActive
						? 'text-indigo-700 font-semibold'
						: 'text-gray-600 font-medium'
				}`}
			>
				{text}
			</span>
		</div>
	)
}
