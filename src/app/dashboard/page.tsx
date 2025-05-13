import { CardMaster } from '@/entities/card-master/card-master'
import { SearchCheck, UserRoundPlus } from 'lucide-react'
// import posthog from 'posthog-js'

export default function DashboardPage() {
	return (
		<main className='py-10 '>
			<div className='max-w-6xl mx-auto'>
				<h1 className='text-3xl font-bold text-center mb-12 text-indigo-700'>
					Выберите опцию
				</h1>

				<div className='flex overflow-x-auto pb-4 md:pb-0 md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 lg:gap-10 space-x-4 md:space-x-0'>
					{/* Карточка "Нужен мастер" */}
					{/* <Link href='/find-master' className='group'>
						<div className='bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full'>
							<div className='relative h-48 sm:h-64 md:h-72 lg:h-80'>
								<Image
									src='/png/dashboard/woman.webp'
									alt='Клиент'
									fill
									className='object-contain lg:object-[center_top]'
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
									priority
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent'></div>
							</div>
							<div className='p-6 sm:p-8 text-white'>
								<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
									Нужен мастер
								</h2>
								<p className='text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base'>
									Найдите профессионала для решения ваших задач быстро и
									безопасно
								</p>
								<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
									<span className='flex items-center gap-2 text-sm sm:text-base'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-5 w-5'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z'
												clipRule='evenodd'
											/>
										</svg>
										Бесплатный поиск
									</span>
									<button className='bg-white text-indigo-600 font-medium py-2 px-6 rounded-full hover:bg-indigo-50 transition-colors duration-300 w-full sm:w-auto text-center'
									onClick={()=>{posthog.capture('my event', { property: 'value' })
								}}
									>
										Найти мастера
									</button>
								</div>
							</div>
						</div>
					</Link> */}
					<div className='min-w-[80vw] snap-center md:min-w-0'>
						<CardMaster
							color='bg-gradient-to-br from-purple-500 to-indigo-600'
							href='/'
							title='Нужен мастер'
							description='Найдите профессионала для решения ваших задач быстро и безопасно'
							image='/png/dashboard/woman.webp'
							buttonText='Найти мастера'
							iconText='Бесплатный поиск'
							icon={<SearchCheck className='w-5 h-5 flex-shrink-0' />}
						/>
					</div>

					<div className='min-w-[80vw] snap-center md:min-w-0'>
						<CardMaster
							color='bg-gradient-to-br from-blue-500/90 to-indigo-600/90'
							href='/vacancies'
							title='Стать мастером'
							description='Предложите свои услуги и найдите новых клиентов на нашей платформе'
							image='/png/page-master/master-dashboard.webp'
							buttonText='Стать мастером'
							iconText='Бесплатная регистрация'
							icon={<UserRoundPlus className='w-5 h-5 flex-shrink-0' />}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}
