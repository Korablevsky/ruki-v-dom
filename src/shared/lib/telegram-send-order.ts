'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

import sharp from 'sharp'

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
 * Конвертирует изображение в формат JPEG
 */
async function convertImageToJpeg(arrayBuffer: ArrayBuffer): Promise<Buffer> {
	try {
		// Используем sharp для конвертации изображения в JPEG
		const buffer = Buffer.from(arrayBuffer)
		const jpegBuffer = await sharp(buffer).jpeg({ quality: 85 }).toBuffer()

		return jpegBuffer
	} catch (error) {
		console.error('Ошибка при конвертации изображения:', error)
		// Если конвертация не удалась, возвращаем исходный буфер
		return Buffer.from(arrayBuffer)
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
				// Обрабатываем не более 5 фотографий для снижения нагрузки на мобильных устройствах
				const limitedPhotos = data.photos.slice(0, 5)

				for (const photo of limitedPhotos) {
					try {
						// Преобразуем File в ArrayBuffer
						const arrayBuffer = await photo.arrayBuffer()

						// Проверяем размер файла и при необходимости уменьшаем его
						if (arrayBuffer.byteLength > 10000000) {
							// Предел ~10MB
							console.warn('Файл слишком большой, пропускаем:', photo.name)
							continue
						}

						// Создаем FormData для отправки файла
						const formData = new FormData()
						formData.append('chat_id', chatId)
						formData.append('caption', `Фото: ${photo.name}`)

						// Проверяем формат файла
						const isHeifFormat =
							photo.type === 'image/heif' ||
							photo.type === 'image/heic' ||
							photo.name.toLowerCase().endsWith('.heic') ||
							photo.name.toLowerCase().endsWith('.heif')

						let fileData
						let fileName = photo.name

						if (isHeifFormat) {
							// Конвертируем HEIF/HEIC в JPEG
							console.log('Конвертация HEIF/HEIC в JPEG:', photo.name)
							fileData = await convertImageToJpeg(arrayBuffer)
							fileName = `${photo.name.split('.')[0]}.jpg`
							formData.append(
								'photo',
								new Blob([fileData], { type: 'image/jpeg' }),
								fileName
							)
						} else {
							// Используем исходный формат
							fileData = arrayBuffer
							formData.append(
								'photo',
								new Blob([fileData], { type: photo.type }),
								fileName
							)
						}

						// Отправляем фото
						const photoResponse = await fetch(
							`https://api.telegram.org/bot${botToken}/sendPhoto`,
							{
								method: 'POST',
								body: formData,
								cache: 'no-store',
							}
						)

						if (!photoResponse.ok) {
							console.error(
								'Ошибка при отправке фото:',
								await photoResponse.text()
							)
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
