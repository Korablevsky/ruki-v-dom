'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { sendVacancyDataToTelegram } from '@/shared/lib/telegram-send-resume'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import Link from 'next/link'
import { IMaskInput } from 'react-imask'

const formSchema = z.object({
	lastName: z.string().min(2, {
		message: 'Фамилия должна содержать минимум 2 символа',
	}),
	firstName: z.string().min(2, {
		message: 'Имя должно содержать минимум 2 символа',
	}),
	city: z.string().min(2, {
		message: 'Укажите город',
	}),
	skills: z.string().min(10, {
		message: 'Расскажите о своих навыках (минимум 10 символов)',
	}),
	phone: z.string().refine(val => val.length === 0 || val.length >= 18, {
		message: 'Введите корректный номер телефона',
	}),
	agreement: z.boolean().refine(val => val === true, {
		message: 'Необходимо согласиться с условиями оферты',
	}),
})

export function VacancyForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [phoneValue, setPhoneValue] = useState('')
	const [phoneError, setPhoneError] = useState<string | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: '',
			firstName: '',
			city: '',
			skills: '',
			phone: '',
			agreement: false,
		},
	})

	// Обновляем значение телефона в форме при изменении phoneValue
	useEffect(() => {
		form.setValue('phone', phoneValue, { shouldValidate: true })
	}, [phoneValue, form])

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Проверяем телефон перед отправкой
		if (phoneValue.length === 0) {
			setPhoneError('Номер телефона обязателен')
			return
		}

		if (phoneValue.length > 0 && phoneValue.length < 18) {
			setPhoneError('Введите корректный номер телефона')
			return
		}

		setIsSubmitting(true)
		try {
			// Отправка данных в Телеграм
			const success = await sendVacancyDataToTelegram({
				...values,
				phone: phoneValue,
			})

			if (success) {
				toast.success('Заявка отправлена', {
					description: 'Мы свяжемся с вами в ближайшее время',
				})
				form.reset()
				setPhoneValue('')
			} else {
				toast.error('Ошибка отправки', {
					description: 'Не удалось отправить заявку, попробуйте позже',
				})
			}
		} catch (error) {
			console.error('Ошибка при отправке формы:', error)
			toast.error('Ошибка', {
				description: 'Произошла ошибка при отправке заявки',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='w-full'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem className=''>
								<FormLabel className=''>Фамилия</FormLabel>
								<FormControl>
									<Input placeholder='Иванов' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input placeholder='Иван' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Город</FormLabel>
								<FormControl>
									<Input placeholder='Москва' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='skills'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Навыки</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Расскажите о своих навыках и опыте работы...'
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
									Укажите ваши профессиональные навыки и опыт работы
								</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='phone'
						render={() => (
							<FormItem>
								<FormLabel>Номер телефона</FormLabel>
								<FormControl>
									<IMaskInput
										className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-indigo-300 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
										mask='+7 (000) 000-00-00'
										unmask={false}
										placeholder='+7 (___) ___-__-__'
										onAccept={value => {
											setPhoneValue(value)
											if (phoneError) {
												if (value.length === 18 || value.length === 0) {
													setPhoneError(null)
												}
											}
										}}
										value={phoneValue}
										aria-invalid={!!phoneError || !!form.formState.errors.phone}
									/>
								</FormControl>
								{phoneError && (
									<div className='text-sm font-medium text-destructive'>
										{phoneError}
									</div>
								)}
								{!phoneError && form.formState.errors.phone && (
									<FormMessage>
										{form.formState.errors.phone.message}
									</FormMessage>
								)}
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='agreement'
						render={({ field }) => (
							<FormItem className='flex flex-row items-center space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
									/>
								</FormControl>
								<div className='flex flex-wrap items-center gap-x-1 leading-normal'>
											<FormLabel className='text-sm inline'>
												Я согласен с{' '}
												<Link
													href='/documents/oferta_dlya_mastera.docx'
													target='_blank'
													rel='noopener noreferrer'
													className='text-indigo-600 hover:text-indigo-500 underline inline'
												>
													условиями оферты
												</Link>{' '}
												и{' '}
												<Link
													href='/politika-konfidencialnosti'
													className='text-indigo-600 hover:text-indigo-500 underline inline'
												>
													Политикой конфиденциальности
												</Link>
											</FormLabel>
											<FormMessage />
										</div>
							</FormItem>
						)}
					/>

					<Button
						variant='outline'
						className='w-full md:bg-white text-white  bg-indigo-600 border border-indigo-600 md:text-indigo-600 md:hover:bg-indigo-600 md:hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer'
						disabled={isSubmitting}
						type='submit'
					>
						{isSubmitting ? 'Отправка...' : 'Отправить заявку'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
