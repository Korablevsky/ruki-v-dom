import { CardMaster } from '@/entities/card-master/card-master'
export default function Vacancies() {
	return (
		<main className='py-10 '>
			{/* <h1 className='text-2xl text-indigo-700 font-bold mb-4'>
				Присоединяйся к команде мастеров!
			</h1> */}

			<CardMaster
				href='/services/master-na-chas'
				title='Присоединяйся к команде мастеров!'
				description='Мы ищем опытных мастеров на час для выполнения заказов по ремонту и бытовым услугам. Работай и получай стабильный доход и новых клиентов!'
				image='/png/page-master/master-dashboard.webp'
				// buttonText='Найти мастера'
				color='bg-gradient-to-br from-sky-500/90 to-blue-600/90'
			/>

			{/* <Advantages /> */}
		</main>
	)
}
