import {
	Accordion,
	AccordionContent,
	AccordionTrigger,
} from '@/shared/ui/accordion'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import { AccordionItem } from '@radix-ui/react-accordion'

const serviceCategories = [
	{
		id: 1,
		title: 'Мастер на час',
		services: [
			{ id: 1, name: 'Замена розетки/выключателя', unit: 'шт.', price: 350 },
			{ id: 2, name: 'Установка светильника', unit: 'шт.', price: 700 },
			{ id: 3, name: 'Сборка/разборка мебели', unit: 'час', price: 1000 },
			{ id: 4, name: 'Навес полок', unit: 'шт.', price: 500 },
			{ id: 5, name: 'Установка карнизов', unit: 'шт.', price: 600 },
			{ id: 6, name: 'Замена смесителя', unit: 'шт.', price: 800 },
			{ id: 7, name: 'Монтаж плинтуса', unit: 'м.п.', price: 300 },
			{ id: 8, name: 'Установка зеркала', unit: 'шт.', price: 900 },
			{ id: 9, name: 'Замена дверных ручек', unit: 'шт.', price: 400 },
			{ id: 10, name: 'Мелкий ремонт мебели', unit: 'услуга', price: 650 },
		],
	},
	{
		id: 2,
		title: 'Сантехник',
		services: [
			{ id: 1, name: 'Устранение течи', unit: 'точка', price: 1000 },
			{ id: 2, name: 'Замена смесителя', unit: 'шт.', price: 1200 },
			{ id: 3, name: 'Установка унитаза', unit: 'шт.', price: 2500 },
			{ id: 4, name: 'Установка ванны', unit: 'шт.', price: 3500 },
			{ id: 5, name: 'Установка душевой кабины', unit: 'шт.', price: 4500 },
			{ id: 6, name: 'Замена труб', unit: 'м.п.', price: 800 },
			{ id: 7, name: 'Установка полотенцесушителя', unit: 'шт.', price: 2000 },
			{ id: 8, name: 'Установка раковины', unit: 'шт.', price: 1800 },
			{ id: 9, name: 'Прочистка канализации', unit: 'услуга', price: 1500 },
			{ id: 10, name: 'Установка водонагревателя', unit: 'шт.', price: 3000 },
		],
	},
	{
		id: 3,
		title: 'Сборщик мебели',
		services: [
			{ id: 1, name: 'Сборка кухонного гарнитура', unit: 'п.м.', price: 2000 },
			{ id: 2, name: 'Сборка шкафа-купе', unit: 'шт.', price: 3000 },
			{ id: 3, name: 'Сборка кровати', unit: 'шт.', price: 1500 },
			{ id: 4, name: 'Сборка стола', unit: 'шт.', price: 1000 },
			{ id: 5, name: 'Сборка комода', unit: 'шт.', price: 1200 },
			{ id: 6, name: 'Сборка дивана', unit: 'шт.', price: 2500 },
			{ id: 7, name: 'Сборка детской мебели', unit: 'комплект', price: 3500 },
			{ id: 8, name: 'Сборка офисной мебели', unit: 'комплект', price: 4000 },
			{ id: 9, name: 'Навес шкафов', unit: 'шт.', price: 1800 },
			{ id: 10, name: 'Установка фурнитуры', unit: 'комплект', price: 800 },
		],
	},
]

export default function Price() {
	return (
		<main className='py-10 '>
			<h1 className='text-2xl text-indigo-700 font-bold mb-4'>
				Цены на услуги
			</h1>

			<Accordion type='single' collapsible className='w-full space-y-2'>
				{serviceCategories.map(category => (
					<AccordionItem
						key={category.id}
						value={`item-${category.id}`}
						className='border rounded-lg px-4 bg-white shadow-sm'
					>
						<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
							{category.title}
						</AccordionTrigger>
						<AccordionContent className='text-sm text-muted-foreground'>
							<div className='overflow-x-auto'>
								<Table className='rounded-md'>
									<TableHeader className='sticky top-0 z-10'>
										<TableRow className='bg-indigo-50'>
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
										{category.services.map((service, index) => (
											<TableRow
												key={service.id}
												className={`group cursor-pointer transition-colors duration-200 hover:bg-blue-50 ${
													index === category.services.length - 1
														? 'last:rounded-b-md'
														: ''
												}`}
											>
												<TableCell
													className={
														index === category.services.length - 1
															? 'first:rounded-bl-md'
															: ''
													}
												>
													{service.name}
												</TableCell>
												<TableCell className='text-center'>
													{service.unit}
												</TableCell>

												<TableCell
													className={`text-center ${
														index === category.services.length - 1
															? 'last:rounded-br-md'
															: ''
													}`}
												>
													{service.price}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</main>
	)
}
