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

		console.log('botToken', botToken)
		console.log('chatId', chatId)

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
			}
		)

		const textResult = await textResponse.json()

		// Если есть фотографии, отправляем их
		if (data.photos && data.photos.length > 0) {
			const photoPromises = data.photos.map(async photo => {
				try {
					// Преобразуем File в ArrayBuffer
					const arrayBuffer = await photo.arrayBuffer()

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
						}
					)

					return photoResponse.json()
				} catch (e) {
					console.error('Ошибка при отправке фото:', e)
					return { ok: false }
				}
			})

			// Ждем завершения отправки всех фото
			await Promise.all(photoPromises)
		}

		return textResult.ok === true
	} catch (error) {
		console.error('Ошибка при отправке данных в Telegram:', error)
		return false
	}
}
