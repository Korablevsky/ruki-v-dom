import { CardMaster } from '@/entities/card-master/card-master'
import { VacancyForm } from '../../features/telegram-message/vacancy-form'

export default function Vacancies() {
	return (
		<main className='container mx-auto py-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div>
					<CardMaster
						// href='https://t.me/korablevsky'
						title='Присоединяйся к команде мастеров!'
						description='Мы ищем опытных мастеров на час для выполнения заказов по ремонту и бытовым услугам. Работай и получай стабильный доход и новых клиентов!'
						image='/png/page-master/master-dashboard.webp'
						// buttonText='Найти мастера'
						color='bg-gradient-to-br from-sky-500/90 to-blue-600/90'
					/>
				</div>

				<section className='flex flex-col justify-center'>
					<h1 className='md:text-2xl text:xl  text-indigo-700 font-bold mb-6 text-center md:text-left'>
						Оставьте заявку чтобы получать заказы
					</h1>

					<VacancyForm />
				</section>
			</div>

			{/* <Advantages /> */}
		</main>
	)
}
