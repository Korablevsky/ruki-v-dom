import Link from 'next/link'

export function Footer() {
	return (
		<footer className='bg-indigo-600 text-white py-6 px-4 mt-auto'>
			<div className='container mx-auto max-w-7xl'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					<p className='text-center md:text-left'>
						&copy; {new Date().getFullYear()} Руки в ДОМ. Все права защищены.
					</p>

					<Link
						href='/politika-konfidencialnosti'
						className='text-white hover:text-indigo-200 transition-colors duration-200'
					>
						Политика конфиденциальности
					</Link>
				</div>
			</div>
		</footer>
	)
}
