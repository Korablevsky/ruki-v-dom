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
import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)

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
							href='/contacts'
							className='relative text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full'
						>
							Муж на час
						</Link>
						<Link
							href='/contacts'
							className='relative text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full'
						>
							Сантехник
						</Link>
						<Link
							href='/contacts'
							className='relative text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full'
						>
							Сборка мебели
						</Link>
						<Link
							href='/contacts'
							className='relative text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full'
						>
							Контакты
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
							<button className='p-1 cursor-pointer md:hidden' aria-label='Открыть меню'>
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
