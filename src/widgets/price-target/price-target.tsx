import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'

export function PriceTarget() {
	const services = [
		{ id: 1, name: 'Навес картин, зеркал', unit: 'Ед.', price: 550 },
		{ id: 2, name: 'Навес полок, шкафа', unit: 'Ед.', price: 660 },
		{ id: 3, name: 'Установка кронштейна для TV, СВЧ', unit: 'Ед.', price: 330 },
		{ id: 4, name: 'Установка карниза', unit: 'Ед.', price: 770 },
		{ id: 5, name: 'Установка жалюзи', unit: 'Ед.', price: 770 },
		{ id: 6, name: 'Установка раковины, мойки', unit: 'Ед.', price: 770 },
		{ id: 7, name: 'Установка смесителя', unit: 'Ед.', price: 750 },
		{ id: 8, name: 'Установка сифона', unit: 'Ед.', price: 330 },
		{ id: 9, name: 'Устранение засора', unit: 'Ед.', price: 660 },
		{ id: 10, name: 'Установка люстры', unit: 'Ед.', price: 460 },
		{ id: 11, name: 'Установка светильника, бра', unit: 'Ед.', price: 310 },
		{ id: 12, name: 'Установка розетки, выключателя', unit: 'Ед.', price: 330 },
		{ id: 13, name: 'Сборка шкафа', unit: 'Ед.', price: 1100 },
		{ id: 14, name: 'Сборка комода', unit: 'Ед.', price: 1100 },
		{ id: 15, name: 'Сборка кровати', unit: 'Ед.', price: 880 },
		{ id: 16, name: 'Сборка стола', unit: 'Ед.', price: 880 },
		{ id: 17, name: 'Установка замка', unit: 'Ед.', price: 1100 },
	]

	return (
		<section className=' bg-gradient-to-br from-purple-500 to-indigo-600 py-10 -mx-4 p-2 '>
			<h2 className='text-xl font-bold mb-4 text-center text-white'>Цены на услуги</h2>
		
		<div className='max-h-[calc(100vh-200px)] p-2 overflow-auto relative'>
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
							<div className='flex cursor-pointer items-center font-medium text-blue-800 w-[60px]'>
								Цена, ₽
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
		</section>
	)
}
