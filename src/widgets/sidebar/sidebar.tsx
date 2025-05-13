'use client'

import { SidebarItem } from '@/shared/ui/sidebar-item'
import {
	Armchair,
	Contact,
	Hammer,
	HelpCircle,
	RussianRuble,
	Star,
	Wrench,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SidebarProps {
	onLinkClick?: () => void
}

export function Sidebar({ onLinkClick }: SidebarProps) {
	const router = useRouter()

	const handleNavigation = (href: string) => {
		if (onLinkClick) {
			onLinkClick()
		}
		// Небольшая задержка для обработки закрытия сайдбара
		setTimeout(() => {
			router.push(href)
		}, 100)
	}

	const menuItems = [
		{
			href: '/services/master-na-chas',
			icon: <Hammer />,
			text: 'Муж на час',
		},
		{
			href: '/services/sanitehnik',
			icon: <Wrench />,
			text: 'Сантехник',
		},
		{
			href: '/services/sborka-mebeli',
			icon: <Armchair />,
			text: 'Сборщик мебели',
		},
		{
			href: '/price',
			icon: <RussianRuble />,
			text: 'Цены',
		},
		{
			href: '/',
			icon: <HelpCircle />,
			text: 'Частые вопросы',
		},
		{
			href: '/vacancies',
			icon: <Star />,
			text: 'Стать мастером',
		},
		{
			href: '/contacts',
			icon: <Contact />,
			text: 'Контакты',
		},
	]

	return (
		<aside className='flex flex-col space-y-3'>
			{menuItems.map((item, index) => (
				<SidebarItem
					key={index}
					href={item.href}
					icon={item.icon}
					text={item.text}
					handleNavigation={handleNavigation}
				/>
			))}
		</aside>
	)
}
