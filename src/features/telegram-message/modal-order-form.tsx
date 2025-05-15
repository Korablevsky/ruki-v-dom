'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { toast } from 'sonner'
import { z } from 'zod'

import { sendOrderDataToTelegram } from '@/shared/lib/telegram-send-order'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
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
import Image from 'next/image'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
]

const PhotoSchema = z
	.custom<File>()
	.refine(
		file => file instanceof File && file.size <= MAX_FILE_SIZE,
		`Максимальный размер файла 5MB`
	)
	.refine(
		file => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
		'Только .jpg, .jpeg, .png и .webp форматы'
	)

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
	address: z.string().min(2, {
		message: 'Укажите адрес',
	}),
	problem: z.string().min(2, {
		message: 'Опишите задачу, которую хотите решить',
	}),
	phone: z.string().optional(),
	photos: z.array(PhotoSchema).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ModalOrderForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [open, setOpen] = useState(false)
	const [phoneValue, setPhoneValue] = useState('')
	const [phoneError, setPhoneError] = useState<string | null>(null)
	const [photos, setPhotos] = useState<File[]>([])
	const [photosPreviews, setPhotosPreviews] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			lastName: '',
			firstName: '',
			city: '',
			address: '',
			problem: '',
			phone: '',
			photos: [],
		},
	})

	const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return

		// Очищаем существующие фото перед добавлением нового
		photosPreviews.forEach(preview => URL.revokeObjectURL(preview))
		setPhotos([])
		setPhotosPreviews([])

		const newFile = e.target.files[0]
		if (
			newFile.size <= MAX_FILE_SIZE &&
			ACCEPTED_IMAGE_TYPES.includes(newFile.type)
		) {
			const preview = URL.createObjectURL(newFile)
			setPhotos([newFile])
			setPhotosPreviews([preview])
			form.setValue('photos', [newFile])
		} else {
			toast.error('Файл не загружен', {
				description:
					'Проверьте размер (макс. 5MB) и формат файла (.jpg, .png, .webp)',
			})
		}

		// Сбрасываем input, чтобы можно было выбрать тот же файл повторно
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const removePhoto = (index: number) => {
		const newPhotos = [...photos]
		const newPreviews = [...photosPreviews]

		// Освобождаем ресурсы для превью
		URL.revokeObjectURL(newPreviews[index])

		newPhotos.splice(index, 1)
		newPreviews.splice(index, 1)

		setPhotos(newPhotos)
		setPhotosPreviews(newPreviews)
		form.setValue('photos', newPhotos)
	}

	// Функция полного сброса формы
	const resetFormCompletely = () => {
		// Удаляем все ошибки валидации
		form.clearErrors()
		setPhoneValue('')
		setPhoneError(null)

		// Очищаем фотографии и превью
		photosPreviews.forEach(preview => URL.revokeObjectURL(preview))
		setPhotos([])
		setPhotosPreviews([])

		// Полностью сбрасываем состояние формы
		form.reset(
			{
				lastName: '',
				firstName: '',
				city: '',
				address: '',
				problem: '',
				phone: '',
				photos: [],
			},
			{
				keepErrors: false,
				keepDirty: false,
				keepIsSubmitted: false,
				keepTouched: false,
				keepIsValid: false,
				keepSubmitCount: false,
			}
		)
	}

	async function onSubmit(values: FormValues) {
		// Проверка номера телефона перед отправкой
		if (!phoneValue || phoneValue.length < 18) {
			setPhoneError('Введите полный номер телефона')
			return
		}

		if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneValue)) {
			setPhoneError(
				'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX'
			)
			return
		}

		setPhoneError(null)
		setIsSubmitting(true)

		try {
			// Добавляем телефон к данным для отправки
			const dataToSend = {
				...values,
				phone: phoneValue,
				photos, // Передаем файлы для отправки
			}

			// Отправка данных в Телеграм
			const success = await sendOrderDataToTelegram(dataToSend)

			if (success) {
				toast.success('Заявка отправлена', {
					description: 'Мы свяжемся с вами в ближайшее время',
				})

				// Сбрасываем форму и закрываем модальное окно
				resetFormCompletely()

				// Закрываем модальное окно с небольшой задержкой
				setTimeout(() => {
					setOpen(false)
				}, 300)
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

	// При закрытии модального окна сбрасываем форму
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			resetFormCompletely()
		}
		setOpen(open)
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='w-full bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer'
				>
					Вызвать мастера
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-bold text-indigo-600'>
						Вызвать мастера
					</DialogTitle>
					<DialogDescription>
						Оставьте заявку и мы свяжемся с вами в ближайшее время
					</DialogDescription>
				</DialogHeader>
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
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Адрес</FormLabel>
										<FormControl>
											<Input placeholder='Укажите адрес' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='problem'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Опишите задачу</FormLabel>
										<FormControl>
											<Textarea placeholder='Опишите задачу' {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>Фотографии</FormLabel>
								<div className='flex flex-col gap-2'>
									<Input
										type='file'
										id='photos'
										accept='.jpg,.jpeg,.png,.webp'
										className='hidden'
										onChange={handlePhotoChange}
										ref={fileInputRef}
									/>
									{photosPreviews.length === 0 && (
										<Button
											type='button'
											variant='outline'
											onClick={() => fileInputRef.current?.click()}
											className='hover:text-indigo-600 md:bg-white text-white  bg-indigo-600 border border-indigo-600 md:text-indigo-600 md:hover:bg-indigo-600 md:hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer w-full'
										>
											Выбрать фото
										</Button>
									)}

									{photosPreviews.length > 0 && (
										<div className='grid grid-cols-1 gap-2 mt-2'>
											{photosPreviews.map((preview, index) => (
												<div key={index} className='relative'>
													<Image
														width={100}
														height={100}
														src={preview}
														alt={`Preview ${index}`}
														className='w-full h-40 object-cover rounded-md'
													/>
													<button
														type='button'
														className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
														onClick={() => removePhoto(index)}
													>
														✕
													</button>
												</div>
											))}
										</div>
									)}
								</div>
							</FormItem>

							<FormField
								control={form.control}
								name='phone'
								render={() => (
									<FormItem>
										<FormLabel>Номер телефона</FormLabel>
										<FormControl>
											<IMaskInput
												key={`phone-input-${open}`}
												className='file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-indigo-300 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
												mask='+7 (000) 000-00-00'
												unmask={false}
												placeholder='+7 (___) ___-__-__'
												onAccept={value => {
													setPhoneValue(value)
													if (phoneError && value.length === 18) {
														setPhoneError(null)
													}
												}}
												value={phoneValue}
												aria-invalid={!!phoneError}
											/>
										</FormControl>
										{phoneError && (
											<div className='text-sm font-medium text-destructive'>
												{phoneError}
											</div>
										)}
									</FormItem>
								)}
							/>

							<Button
								variant='outline'
								className='w-full hover:text-indigo-600 md:bg-white text-white  bg-indigo-600 border border-indigo-600 md:text-indigo-600 md:hover:bg-indigo-600 md:hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer'
								disabled={isSubmitting}
								type='submit'
							>
								{isSubmitting ? 'Отправка...' : 'Отправить заявку'}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
