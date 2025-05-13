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
		<header className='sticky top-0 z-50 flex p-1 bg-white border-b border-gray-100 items-center shadow-sm justify-between'>
			<Link
				className='text-xl font-medium text-indigo-600 hover:text-indigo-700 transition-colors'
				href='/'
			>
				<Image
					src='/favicon.png'
					alt='logo'
					width={70}
					height={70}
					className=''
				/>
			</Link>

			<nav className='flex items-center gap-2'>
				<Link
					href='tel:+79534574099'
					className='flex items-center gap-2 px-3 py-1.5 transition-colors bg-gradient-to-br from-blue-500 to-indigo-600  text-white rounded-md '
				>
					<PhoneOutgoing className='w-6 h-6  transition-colors' />
					Позвонить
				</Link>

				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<button className='p-1'>
							<Menu className='w-9 h-9 text-indigo-600 transition-colors ml-auto' />
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
		</header>
	)
}
