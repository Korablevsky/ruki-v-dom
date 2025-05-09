import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/accordion'
import Link from 'next/link'

export function Help() {
	const dataFaq = [
		{
			id: 1,
			question: 'Нужно ли предоставлять свои инструменты или материалы?',
			answer:
				'Нет, наши мастера приезжают со всеми необходимыми инструментами и базовыми материалами. Если нужны специфические детали (например, запчасти для сантехники), мы согласуем их покупку с вами.',
		},
		{
			id: 2,
			question: 'Работаете ли вы в выходные и праздники?',
			answer:
				'Да, мы работаем с 9:00 до 21:00, включая выходные и праздничные дни. Вы можете вызвать мастера в любое удобное время.',
		},
		{
			id: 3,
			question: 'Что делать, если я не знаю, какая именно услуга мне нужна?',
			answer: (
				<>
					Позвоните или напишите нам в{' '}
					<Link
						href='https://t.me/your_telegram'
						className='text-[#0088cc] underline hover:text-gray-200'
						target='_blank'
						rel='noopener noreferrer'
					>
						Telegram
					</Link>{' '}
					или{' '}
					<Link
						href='https://wa.me/your_whatsapp'
						className='text-[#25D366] underline hover:text-gray-200'
						target='_blank'
						rel='noopener noreferrer'
					>
						WhatsApp
					</Link>{' '}
					о своей проблеме и мы поможем вам определиться с выбором.
				</>
			),
		},
		{
			id: 4,
			question: 'Сколько стоит вызов мастера?',
			answer: (
				<>
					Вызов мастера начинается от 500 рублей. Точная стоимость зависит от
					вида работы и сложности задачи. Мы озвучиваем цену до начала работ,
					чтобы вы знали, за что платите.{' '}
					<Link
						href='/price'
						className='text-indigo-700 font-bold '
						target='_blank'
						rel='noopener noreferrer'
					>
						Посмотреть цены
					</Link>{' '}
				</>
			),
		},
		{
			id: 5,
			question: 'Как быстро приедет мастер?',
			answer:
				'В среднем в течение 30-60 минут после заявки мастер прибывает на место, в зависимости от вашего адреса и загруженности. Мы работаем с 9:00 до 21:00, чтобы вам помочь!',
		},
	]
	return (
		<section className='flex flex-col gap-4 '>
			<h2 className='text-2xl text-indigo-700 font-bold text-center mb-2'>
				Часто задаваемые вопросы
			</h2>
			<Accordion type='single' collapsible className='w-full space-y-2'>
				{dataFaq.map(item => (
					<AccordionItem
						key={item.id}
						value={`item-${item.id}`}
						className='border rounded-lg px-4 bg-white shadow-sm'
					>
						<AccordionTrigger className='text-lg leading-6 text-gray-700 font-semibold hover:no-underline data-[state=open]:text-indigo-700'>
							{item.question}
						</AccordionTrigger>
						<AccordionContent className='text-sm text-muted-foreground'>
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
		
	)
}
