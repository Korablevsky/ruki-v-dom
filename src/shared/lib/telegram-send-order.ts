'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

// Максимальный размер файла для обработки (3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024

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
			// Отправляем текстовое сообщение
			console.log('Отправка текстового сообщения в Telegram...')
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

			console.log('Текстовое сообщение успешно отправлено')

			// Если есть фотографии, отправляем их как документы
			if (data.photos && data.photos.length > 0) {
				// Обрабатываем не более 3 фотографий для снижения нагрузки
				const limitedPhotos = data.photos.slice(0, 3)

				console.log(
					`Количество фотографий для отправки: ${limitedPhotos.length}`
				)

				// Подготавливаем функции для отправки каждой фотографии
				const sendPhotoPromises = limitedPhotos.map(async (photo, index) => {
					try {
						console.log(
							`Подготовка фото ${index + 1}/${limitedPhotos.length}:`,
							{
								name: photo.name,
								type: photo.type,
								size: `${(photo.size / 1024).toFixed(2)} KB`,
							}
						)

						// Проверяем размер файла
						if (photo.size > MAX_FILE_SIZE) {
							console.warn(
								`Файл слишком большой (${photo.size} байт), пропускаем:`,
								photo.name
							)
							return { success: false, reason: 'file_too_large' }
						}

						// Преобразуем File в ArrayBuffer с таймаутом
						const arrayBufferPromise = new Promise<ArrayBuffer>(
							(resolve, reject) => {
								const timeout = setTimeout(() => {
									reject(new Error(`Таймаут при чтении файла ${photo.name}`))
								}, 10000) // 10 секунд на чтение файла

								photo
									.arrayBuffer()
									.then(buffer => {
										clearTimeout(timeout)
										resolve(buffer)
									})
									.catch(err => {
										clearTimeout(timeout)
										reject(err)
									})
							}
						)

						const arrayBuffer = await arrayBufferPromise
						console.log(
							`Файл ${photo.name} преобразован в ArrayBuffer, размер: ${arrayBuffer.byteLength} байт`
						)

						// Создаем FormData для отправки файла как документа
						const formData = new FormData()
						formData.append('chat_id', chatId)
						formData.append('caption', `Фото ${index + 1}: ${photo.name}`)

						// Добавляем файл как документ
						formData.append('document', new Blob([arrayBuffer]), photo.name)

						console.log(
							`Отправка файла ${photo.name} как документа в Telegram...`
						)

						// Отправляем как документ с таймаутом
						const controller = new AbortController()
						const timeoutId = setTimeout(() => controller.abort(), 20000) // 20 секунд на отправку

						try {
							const docResponse = await fetch(
								`https://api.telegram.org/bot${botToken}/sendDocument`,
								{
									method: 'POST',
									body: formData,
									cache: 'no-store',
									signal: controller.signal,
								}
							)

							clearTimeout(timeoutId)

							const responseText = await docResponse.text()

							if (!docResponse.ok) {
								console.error(
									`Ошибка при отправке документа ${photo.name}:`,
									responseText
								)
								return {
									success: false,
									reason: 'api_error',
									details: responseText,
								}
							} else {
								console.log(
									`Файл ${photo.name} успешно отправлен в Telegram как документ`
								)
								return { success: true }
							}
						} catch (fetchError: unknown) {
							clearTimeout(timeoutId)
							if (
								fetchError instanceof Error &&
								fetchError.name === 'AbortError'
							) {
								console.error(
									`Превышено время ожидания при отправке файла ${photo.name}`
								)
								return { success: false, reason: 'timeout' }
							}
							throw fetchError
						}
					} catch (e: unknown) {
						console.error(`Ошибка при обработке файла ${photo.name}:`, e)
						const errorMessage = e instanceof Error ? e.message : String(e)
						return {
							success: false,
							reason: 'processing_error',
							details: errorMessage,
						}
					}
				})

				// Отправляем все фотографии параллельно
				console.log('Начинаем параллельную отправку фотографий...')
				const results = await Promise.all(sendPhotoPromises)

				// Анализируем результаты
				const successCount = results.filter(r => r.success).length
				console.log(
					`Отправка фотографий завершена. Успешно: ${successCount}/${limitedPhotos.length}`
				)

				// Если хотя бы одна фотография отправлена успешно, считаем задачу выполненной
				if (successCount === 0 && limitedPhotos.length > 0) {
					console.warn('Ни одна фотография не была отправлена успешно')
					// Но мы все равно возвращаем true, так как текстовое сообщение отправлено
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
