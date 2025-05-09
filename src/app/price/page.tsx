import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'

const services = [
	{ id: 1, name: 'Установка гардин', unit: 'шт.', price: 700 },
	{ id: 2, name: 'Установка карнизов', unit: 'шт.', price: 500 },
	{ id: 3, name: 'Установка жалюзи', unit: 'шт.', price: 800 },
	{ id: 4, name: 'Установка рулонных штор', unit: 'шт.', price: 600 },
	{ id: 5, name: 'Установка римских штор', unit: 'шт.', price: 900 },
	{ id: 6, name: 'Установка вертикальных жалюзи', unit: 'шт.', price: 1000 },
	{ id: 7, name: 'Установка плиссе', unit: 'шт.', price: 850 },
	{ id: 8, name: 'Установка мультифактурных штор', unit: 'шт.', price: 1200 },
	{ id: 9, name: 'Установка портьер', unit: 'шт.', price: 1100 },
	{ id: 10, name: 'Установка ламбрекенов', unit: 'шт.', price: 950 },
	{ id: 11, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 12, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 13, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 14, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 15, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 16, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 17, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 18, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 19, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 20, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 21, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 22, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 23, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 24, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 25, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 26, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 27, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 28, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 29, name: 'Установка штор', unit: 'шт.', price: 1000 },
	{ id: 30, name: 'Установка штор', unit: 'шт.', price: 1000 },
]

export default function Price() {
	return (
		<main className='py-10 '>
			<h1 className='text-2xl text-indigo-700 font-bold mb-4'>
				Цены на услуги
			</h1>

			<div className='h-[calc(100vh-200px)] -mx-2 overflow-auto relative'>
				<Table className='rounded-md'>
					<TableHeader className='sticky top-0 z-10 '>
						<TableRow className='bg-indigo-50 '>
							<TableHead className='w-full first:rounded-tl-lg bg-indigo-50'>
								<div className='flex cursor-pointer items-center text-blue-800'>
									Услуга
								</div>
							</TableHead>
							<TableHead className='bg-indigo-50'>
								<div className='flex cursor-pointer items-center justify-center font-medium text-center w-[60px] text-blue-800'>
									Ед. изм
								</div>
							</TableHead>
							<TableHead className='last:rounded-tr-md bg-indigo-50'>
								<div className='flex cursor-pointer items-center font-medium text-blue-800'>
									Цена
								</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{services.map((service, index) => (
							<TableRow
								key={service.id}
								className={`group cursor-pointer transition-colors duration-200 hover:bg-blue-50 ${
									index === services.length - 1 ? 'last:rounded-b-md' : ''
								}`}
							>
								<TableCell
									className={
										index === services.length - 1 ? 'first:rounded-bl-md' : ''
									}
								>
									{service.name}
								</TableCell>
								<TableCell className='text-center'>{service.unit}</TableCell>
								
								<TableCell
									className={`text-center ${
										index === services.length - 1 ? 'last:rounded-br-md' : ''
									}`}
								>
									{service.price}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</main>
	)
}
