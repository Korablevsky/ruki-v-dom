'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

import { fileTypeFromBuffer } from 'file-type'
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
async function convertImageToJpeg(
	arrayBuffer: ArrayBuffer,
	fileName: string
): Promise<{ buffer: Buffer; success: boolean }> {
	try {
		console.log(`Начало конвертации ${fileName} в JPEG...`)

		// Определяем тип файла по содержимому
		const buffer = Buffer.from(arrayBuffer)
		const fileType = await fileTypeFromBuffer(buffer)

		console.log(
			`Определен тип файла для ${fileName}:`,
			fileType?.mime || 'неизвестный'
		)

		// Конвертируем с помощью sharp
		const jpegBuffer = await sharp(buffer, {
			failOnError: false, // Не выбрасывать ошибку при проблемах с форматом
		})
			.jpeg({ quality: 85 })
			.toBuffer()

		console.log(
			`Конвертация ${fileName} в JPEG успешно завершена, размер: ${jpegBuffer.length} байт`
		)

		return { buffer: jpegBuffer, success: true }
	} catch (error) {
		console.error(`Ошибка при конвертации ${fileName} в JPEG:`, error)
		// Если конвертация не удалась, возвращаем исходный буфер с флагом неудачи
		return { buffer: Buffer.from(arrayBuffer), success: false }
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

						// Определяем тип файла по содержимому и расширению
						const buffer = Buffer.from(arrayBuffer)
						const fileType = await fileTypeFromBuffer(buffer)
						const fileExtension =
							photo.name.split('.').pop()?.toLowerCase() || ''

						console.log(
							`Файл ${photo.name}, тип: ${photo.type}, определенный тип: ${
								fileType?.mime || 'неизвестный'
							}, расширение: ${fileExtension}`
						)

						// Проверяем формат файла
						const isHeifFormat =
							photo.type === 'image/heif' ||
							photo.type === 'image/heic' ||
							fileType?.mime === 'image/heif' ||
							fileType?.mime === 'image/heic' ||
							fileExtension === 'heic' ||
							fileExtension === 'heif'

						if (isHeifFormat) {
							// Конвертируем HEIF/HEIC в JPEG
							console.log(
								'Обнаружен формат HEIF/HEIC, начинаем конвертацию:',
								photo.name
							)

							try {
								const { buffer: jpegBuffer, success } =
									await convertImageToJpeg(arrayBuffer, photo.name)

								if (success) {
									const fileName = `${photo.name.split('.')[0]}.jpg`
									console.log(`Отправляем конвертированный файл ${fileName}`)
									formData.append(
										'photo',
										new Blob([jpegBuffer], { type: 'image/jpeg' }),
										fileName
									)
								} else {
									// Если конвертация не удалась, попробуем отправить как есть
									console.log(
										`Конвертация не удалась, пробуем отправить оригинал: ${photo.name}`
									)
									formData.append(
										'photo',
										new Blob([arrayBuffer], {
											type: photo.type || 'application/octet-stream',
										}),
										photo.name
									)
								}
							} catch (convError) {
								console.error('Ошибка в процессе конвертации:', convError)
								// В случае ошибки, пробуем отправить как есть
								formData.append(
									'photo',
									new Blob([arrayBuffer], {
										type: photo.type || 'application/octet-stream',
									}),
									photo.name
								)
							}
						} else {
							// Используем исходный формат
							console.log(`Отправляем файл в исходном формате: ${photo.name}`)
							formData.append(
								'photo',
								new Blob([arrayBuffer], {
									type:
										photo.type || fileType?.mime || 'application/octet-stream',
								}),
								photo.name
							)
						}

						// Отправляем фото
						console.log(`Отправка файла ${photo.name} в Telegram...`)

						try {
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
							} else {
								console.log(`Файл ${photo.name} успешно отправлен в Telegram`)
								console.log('Ответ API:', responseText)
							}
						} catch (e) {
							console.error('Ошибка при отправке фото в Telegram:', e)
							// Продолжаем с другими фото, даже если одно не удалось отправить
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
