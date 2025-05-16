'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/heic',
	'image/heif',
]

const PhotoSchema = z
	.custom<File>()
	.refine(
		file => file instanceof File && file.size <= MAX_FILE_SIZE,
		`Максимальный размер файла 5MB`
	)
	.refine(
		file => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
		'Только .jpg, .jpeg, .png, .webp, .gif, .heic и .heif форматы'
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
	const [isMobile, setIsMobile] = useState(false)

	// Определение мобильного устройства при монтировании компонента
	useEffect(() => {
		setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
	}, [])

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

	const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return

		// Очищаем существующие фото перед добавлением нового
		photosPreviews.forEach(preview => URL.revokeObjectURL(preview))
		setPhotos([])
		setPhotosPreviews([])

		const newFile = e.target.files[0]

		// Дополнительная проверка размера для мобильных устройств
		if (isMobile && newFile.size > 2 * 1024 * 1024) {
			// 2MB для мобильных
			toast.error('Файл слишком большой для мобильного устройства', {
				description: 'Пожалуйста, выберите файл размером до 2MB',
			})
			return
		}

		if (
			newFile.size <= MAX_FILE_SIZE &&
			ACCEPTED_IMAGE_TYPES.includes(newFile.type)
		) {
			try {
				// Проверяем, является ли файл HEIC/HEIF
				const isHeicFormat =
					newFile.type === 'image/heic' ||
					newFile.type === 'image/heif' ||
					newFile.name.toLowerCase().endsWith('.heic') ||
					newFile.name.toLowerCase().endsWith('.heif')

				let fileForPreview = newFile
				let fileForUpload = newFile

				// Если это HEIC/HEIF, конвертируем его в JPEG
				if (isHeicFormat) {
					toast.info('Обработка HEIC/HEIF изображения...', {
						description: 'Пожалуйста, подождите, идет конвертация',
					})

					try {
						// Конвертируем HEIC в Blob (JPEG)
						const heic2any = (await import('heic2any')).default
						const result = await heic2any({
							blob: newFile,
							toType: 'image/jpeg',
							quality: 0.8,
						})

						// heic2any может вернуть как один Blob, так и массив Blob
						const jpegBlob = Array.isArray(result) ? result[0] : result

						// Создаем File из Blob для превью и отправки
						const jpegFile = new File(
							[jpegBlob],
							newFile.name.replace(/\.(heic|heif)$/i, '.jpg'),
							{
								type: 'image/jpeg',
								lastModified: new Date().getTime(),
							}
						)

						// Используем конвертированный файл и для превью, и для отправки
						fileForPreview = jpegFile
						fileForUpload = jpegFile

						toast.success('Изображение успешно конвертировано')
					} catch (convError) {
						console.error('Ошибка при конвертации HEIC/HEIF:', convError)
						toast.error('Не удалось конвертировать HEIC/HEIF изображение', {
							description:
								'Пожалуйста, используйте другой формат изображения (JPG, PNG)',
						})

						// В случае ошибки конвертации прерываем загрузку
						if (fileInputRef.current) {
							fileInputRef.current.value = ''
						}
						return
					}
				}

				// Создаем превью для файла
				const filePreview = URL.createObjectURL(fileForPreview)
				setPhotos([fileForUpload])
				setPhotosPreviews([filePreview])
				form.setValue('photos', [fileForUpload])

				// Для мобильных устройств показываем дополнительную информацию
				if (isMobile) {
					toast.info('Фото добавлено', {
						description:
							'Обратите внимание, что на мобильных устройствах отправка может занять больше времени',
					})
				}
			} catch (error) {
				console.error('Ошибка при создании превью:', error)
				toast.error('Не удалось обработать фото', {
					description: 'Пожалуйста, попробуйте другой файл',
				})
			}
		} else {
			toast.error('Файл не загружен', {
				description:
					'Проверьте размер (макс. 5MB) и формат файла (.jpg, .png, .webp, .heic, .heif)',
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
			toast.error('Ошибка валидации', {
				description: 'Введите полный номер телефона',
			})
			return
		}

		if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneValue)) {
			setPhoneError(
				'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX'
			)
			toast.error('Ошибка валидации', {
				description:
					'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX',
			})
			return
		}

		setPhoneError(null)
		setIsSubmitting(true)

		try {
			// Ограничиваем количество фотографий для мобильных устройств
			const limitedPhotos = photos.slice(0, 5)

			// Добавляем телефон к данным для отправки
			const dataToSend = {
				...values,
				phone: phoneValue,
				photos: limitedPhotos, // Передаем ограниченное количество файлов
			}

			if (isMobile && photos.length > 0) {
				toast.info('Обработка фотографий...', {
					description:
						'На мобильных устройствах загрузка может занять больше времени',
				})
			}

			// Отправка данных в Телеграм с таймаутом
			const timeoutPromise = new Promise<boolean>((_, reject) =>
				setTimeout(
					() => reject(new Error('Превышено время ожидания ответа')),
					60000 // Увеличиваем таймаут до 60 секунд
				)
			)

			// Показываем индикатор загрузки
			if (photos.length > 0) {
				toast.info('Отправка формы с фотографией...', {
					description: 'Это может занять до минуты, пожалуйста, подождите',
					duration: 3000,
				})
			}

			const success = await Promise.race([
				sendOrderDataToTelegram(dataToSend),
				timeoutPromise,
			])

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
			let errorMessage = 'Произошла неизвестная ошибка'

			if (error instanceof Error) {
				// Обработка конкретных ошибок
				if (
					error.message.includes('timeout') ||
					error.message.includes('превышено время')
				) {
					errorMessage = 'Превышено время ожидания ответа от сервера'
				} else if (
					error.message.includes('network') ||
					error.message.includes('сеть')
				) {
					errorMessage = 'Ошибка сетевого подключения'
				} else {
					errorMessage = error.message
				}
			}

			toast.error('Ошибка', {
				description: `Произошла ошибка при отправке заявки: ${errorMessage}`,
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
			<DialogContent
				className={`sm:max-w-[425px] max-h-[90vh] overflow-y-auto ${
					isMobile ? 'p-4' : 'p-6'
				}`}
			>
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
										accept='.jpg,.jpeg,.png,.webp,.heic,.heif'
										className='hidden'
										onChange={async e => {
											try {
												await handlePhotoChange(e)
											} catch (error) {
												const errorMessage =
													error instanceof Error
														? error.message
														: 'Неизвестная ошибка при загрузке файла'
												toast.error('Ошибка загрузки файла', {
													description: errorMessage,
												})
											}
										}}
										ref={fileInputRef}
									/>
									{photosPreviews.length === 0 && (
										<>
											<Button
												type='button'
												variant='outline'
												onClick={() => fileInputRef.current?.click()}
												className='hover:text-indigo-600 md:bg-white text-white  bg-indigo-600 border border-indigo-600 md:text-indigo-600 md:hover:bg-indigo-600 md:hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer w-full'
											>
												Выбрать фото
											</Button>
											{isMobile && (
												<div className='text-xs text-gray-500 mt-1'>
													*Форма без фотографий отправляется быстрее
												</div>
											)}
										</>
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
								className='w-full hover:text-indigo-600 md:bg-white text-white bg-indigo-600 border border-indigo-600 md:text-indigo-600 md:hover:bg-indigo-600 md:hover:text-white transition-all duration-300 text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer'
								disabled={isSubmitting}
								type='submit'
								onClick={() => {
									const formErrors = form.formState.errors
									if (Object.keys(formErrors).length > 0) {
										// Показываем первую ошибку валидации в тостере
										const firstErrorField = Object.keys(formErrors)[0]
										const firstError =
											formErrors[firstErrorField as keyof typeof formErrors]
												?.message
										if (firstError && typeof firstError === 'string') {
											toast.error('Ошибка валидации', {
												description: firstError,
											})
										}
									}
								}}
							>
								{isSubmitting ? (
									<div className='flex items-center justify-center gap-2'>
										<svg
											className='animate-spin -ml-1 mr-2 h-5 w-5 text-white md:text-indigo-600'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
										>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											></path>
										</svg>
										<span>Отправка...</span>
									</div>
								) : (
									'Отправить заявку'
								)}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
