'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

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
						if (arrayBuffer.byteLength > 5000000) {
							// Предел ~5MB
							console.warn('Файл слишком большой, пропускаем:', photo.name)
							continue
						}

						// Создаем FormData для отправки файла
						const formData = new FormData()
						formData.append('chat_id', chatId)
						formData.append('caption', `Фото: ${photo.name}`)

						// Создаем Blob из ArrayBuffer с типом файла
						const blob = new Blob([arrayBuffer], { type: photo.type })
						formData.append('photo', blob, photo.name)

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
