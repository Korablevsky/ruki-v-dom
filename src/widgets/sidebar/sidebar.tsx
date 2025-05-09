'use client'

import { SidebarItem } from '@/shared/ui/sidebar-item'
import {
	Contact,
	HelpCircle,
	RussianRuble,
	Star,
	Wrench,
	Zap,
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
			href: '/contacts',
			icon: <Contact />,
			text: 'Контакты',
		},
		{
			href: '/',
			icon: <Zap />,
			text: 'Услуги электрика',
		},
		{
			href: '/',
			icon: <Wrench />,
			text: 'Услуги сантехника',
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
			icon: <Star  />,
			text: 'Стать мастером',
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
