'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/ui/sheet'
import { Menu, PhoneOutgoing } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	return (
		<header className='sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm'>
			<div className='container mx-auto flex items-center justify-between p-2'>
				<Link
					className='text-xl font-medium text-indigo-600 hover:text-indigo-700 transition-colors'
					href='/'
					aria-label='Главная страница'
				>
					<Image
						src='/favicon.png'
						alt='Руки в дом лого'
						width={70}
						height={70}
						priority
						className='h-14 w-auto'
					/>
				</Link>

				<nav className='flex items-center gap-3'>
					{/* Десктопная навигация */}
					<div className='hidden md:flex items-center space-x-6'>
						<Link
							href='/services/master-na-chas'
							className={`relative ${
								pathname === '/services/master-na-chas'
									? 'text-indigo-600 after:w-full'
									: 'text-gray-700 hover:text-indigo-600 after:w-0 hover:after:w-full'
							} font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all`}
						>
							Муж на час
						</Link>
						<Link
							href='/services/sanitehnik'
							className={`relative ${
								pathname === '/services/sanitehnik'
									? 'text-indigo-600 after:w-full'
									: 'text-gray-700 hover:text-indigo-600 after:w-0 hover:after:w-full'
							} font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all`}
						>
							Сантехник
						</Link>
						<Link
							href='/services/sborka-mebeli'
							className={`relative ${
								pathname === '/services/sborka-mebeli'
									? 'text-indigo-600 after:w-full'
									: 'text-gray-700 hover:text-indigo-600 after:w-0 hover:after:w-full'
							} font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all`}
						>
							Сборка мебели
						</Link>
						<Link
							href='/prices'
							className={`relative ${
								pathname === '/prices'
									? 'text-indigo-600 after:w-full'
									: 'text-gray-700 hover:text-indigo-600 after:w-0 hover:after:w-full'
							} font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all`}
						>
							Цены
						</Link>
					</div>

					<Link
						href='tel:+79534574099'
						className='flex items-center gap-2 px-4 py-2 transition-colors animate-gradient bg-gradient-to-br from-pink-500 to-indigo-600 bg-size-200 text-white rounded-md hover:shadow-lg font-medium'
					>
						<PhoneOutgoing className='w-5 h-5 md:w-5 md:h-5 flex-shrink-0' />
						<span className='block md:hidden'>Позвонить</span>
						<span className='hidden md:block text-sm'>+7 (953) 457-40-99</span>
					</Link>

					{/* Мобильное меню */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<button
								className='p-1 cursor-pointer md:hidden'
								aria-label='Открыть меню'
							>
								<Menu className='w-8 h-8 text-indigo-600 transition-colors' />
							</button>
						</SheetTrigger>
						<SheetContent side='left' className='bg-white'>
							<SheetHeader>
								<SheetTitle className='text-xl text-indigo-600 font-bold mb-4'>
									Меню
								</SheetTitle>
								<Sidebar onLinkClick={() => setIsOpen(false)} />
							</SheetHeader>
						</SheetContent>
					</Sheet>
				</nav>
			</div>
		</header>
	)
}
