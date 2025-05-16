'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

import { fileTypeFromBuffer } from 'file-type'
import sharp from 'sharp'

// Максимальный размер файла для обработки (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

interface OrderFormData {
	lastName: string
	firstName: string
	city: string
	address: string
	phone: string
	problem: string
	photos?: File[]
}

/**
 * Конвертирует изображение в формат JPEG и оптимизирует его размер
 */
async function processImage(
	arrayBuffer: ArrayBuffer,
	fileName: string
): Promise<{ buffer: Buffer; success: boolean; mimeType: string }> {
	try {
		console.log(
			`Начало обработки ${fileName}, размер: ${arrayBuffer.byteLength} байт`
		)

		// Определяем тип файла по содержимому
		const buffer = Buffer.from(arrayBuffer)
		const fileType = await fileTypeFromBuffer(buffer)

		console.log(
			`Определен тип файла для ${fileName}:`,
			fileType?.mime || 'неизвестный'
		)

		// Используем sharp для обработки изображения
		const image = sharp(buffer, {
			failOnError: false, // Не выбрасывать ошибку при проблемах с форматом
		})

		// Получаем метаданные изображения
		const metadata = await image.metadata()
		console.log(
			`Метаданные изображения ${fileName}:`,
			metadata.width,
			'x',
			metadata.height,
			'формат:',
			metadata.format
		)

		// Определяем, нужно ли уменьшить размер
		const needsResize = metadata.width && metadata.width > 1200

		// Обрабатываем изображение
		let processedImage = image

		if (needsResize) {
			processedImage = processedImage.resize({
				width: 1200,
				withoutEnlargement: true,
			})
		}

		// Конвертируем в JPEG с оптимизацией качества
		const jpegBuffer = await processedImage
			.jpeg({ quality: 80, mozjpeg: true })
			.toBuffer()

		console.log(
			`Обработка ${fileName} успешно завершена, новый размер: ${jpegBuffer.length} байт`
		)

		return { buffer: jpegBuffer, success: true, mimeType: 'image/jpeg' }
	} catch (error) {
		console.error(`Ошибка при обработке ${fileName}:`, error)
		// Если обработка не удалась, возвращаем исходный буфер с флагом неудачи
		return {
			buffer: Buffer.from(arrayBuffer),
			success: false,
			mimeType: 'application/octet-stream',
		}
	}
}

/**
 * Отправляет данные заказа в Телеграм канал через бота
 */
export async function sendOrderDataToTelegram(
	data: OrderFormData
): Promise<boolean> {
	try {
		// Получаем токен бота и ID чата из переменных окружения
		const botToken = process.env.TELEGRAM_BOT_ORDER_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		console.log('botToken', botToken ? 'Определен' : 'Не определен')
		console.log('chatId', chatId ? 'Определен' : 'Не определен')

		if (!botToken || !chatId) {
			console.error('Отсутствуют переменные окружения для Telegram')
			return false
		}

		// Формируем сообщение для отправки
		const message = `
🔔 *Новая заявка на услугу*

👤 *ФИО*: ${data.lastName} ${data.firstName}
🏙️ *Город*: ${data.city}
🏠 *Адрес*: ${data.address}
📞 *Телефон*: ${data.phone}
💬 *Проблема*: ${data.problem}
📷 *Фотографии*: ${
			data.photos && data.photos.length > 0 ? 'Прикреплены' : 'Нет'
		}
`

		// Используем Telegram Bot API для отправки текстового сообщения
		try {
			const textResponse = await fetch(
				`https://api.telegram.org/bot${botToken}/sendMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						chat_id: chatId,
						text: message,
						parse_mode: 'Markdown',
					}),
					cache: 'no-store',
				}
			)

			if (!textResponse.ok) {
				const errorText = await textResponse.text()
				console.error('Ошибка отправки сообщения:', errorText)
				return false
			}

			const textResult = await textResponse.json()

			if (!textResult.ok) {
				console.error('Telegram API вернул ошибку:', textResult)
				return false
			}

			// Если есть фотографии, отправляем их
			if (data.photos && data.photos.length > 0) {
				// Обрабатываем не более 5 фотографий для снижения нагрузки
				const limitedPhotos = data.photos.slice(0, 5)

				for (const photo of limitedPhotos) {
					try {
						// Проверяем размер файла
						if (photo.size > MAX_FILE_SIZE) {
							console.warn(
								`Файл слишком большой (${photo.size} байт), пропускаем:`,
								photo.name
							)
							continue
						}

						// Преобразуем File в ArrayBuffer
						const arrayBuffer = await photo.arrayBuffer()

						// Обрабатываем изображение (конвертация + оптимизация)
						const {
							buffer: processedBuffer,
							success,
							mimeType,
						} = await processImage(arrayBuffer, photo.name)

						// Создаем FormData для отправки файла
						const formData = new FormData()
						formData.append('chat_id', chatId)
						formData.append('caption', `Фото: ${photo.name}`)

						// Определяем имя файла для отправки
						const fileName =
							success && mimeType === 'image/jpeg'
								? `${photo.name.split('.')[0]}.jpg`
								: photo.name

						console.log(`Отправка файла ${fileName} в Telegram...`)

						// Добавляем файл в форму
						formData.append(
							'photo',
							new Blob([processedBuffer], { type: mimeType }),
							fileName
						)

						// Отправляем фото
						const photoResponse = await fetch(
							`https://api.telegram.org/bot${botToken}/sendPhoto`,
							{
								method: 'POST',
								body: formData,
								cache: 'no-store',
							}
						)

						const responseText = await photoResponse.text()

						if (!photoResponse.ok) {
							console.error('Ошибка при отправке фото:', responseText)

							// Если не удалось отправить как фото, пробуем отправить как документ
							if (photoResponse.status === 400) {
								console.log('Пробуем отправить как документ...')

								const docFormData = new FormData()
								docFormData.append('chat_id', chatId)
								docFormData.append('caption', `Файл: ${photo.name}`)
								docFormData.append(
									'document',
									new Blob([processedBuffer], { type: mimeType }),
									fileName
								)

								const docResponse = await fetch(
									`https://api.telegram.org/bot${botToken}/sendDocument`,
									{
										method: 'POST',
										body: docFormData,
										cache: 'no-store',
									}
								)

								if (!docResponse.ok) {
									console.error(
										'Ошибка при отправке документа:',
										await docResponse.text()
									)
								} else {
									console.log('Файл успешно отправлен как документ')
								}
							}
						} else {
							console.log(`Файл ${fileName} успешно отправлен в Telegram`)
						}
					} catch (e) {
						console.error('Ошибка при обработке фото:', e)
						// Продолжаем с другими фото, даже если одно не удалось отправить
					}
				}
			}

			return true
		} catch (networkError) {
			console.error('Сетевая ошибка при отправке в Telegram:', networkError)
			return false
		}
	} catch (error) {
		console.error('Ошибка при отправке данных в Telegram:', error)
		return false
	}
}
