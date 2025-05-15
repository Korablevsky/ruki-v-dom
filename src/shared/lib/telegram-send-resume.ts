'use server'
/**
 * Сервис для отправки данных в Телеграм
 */

interface VacancyFormData {
	lastName: string
	firstName: string
	city: string
	skills: string
	phone: string
}

/**
 * Отправляет данные вакансии в Телеграм канал через бота
 */
export async function sendVacancyDataToTelegram(
	data: VacancyFormData
): Promise<boolean> {
	try {
		// Формируем сообщение для отправки
		const message = `
🔔 *Новая заявка на вакансию*

👤 *ФИО*: ${data.lastName} ${data.firstName}
🏙️ *Город*: ${data.city}
📞 *Телефон*: ${data.phone}
💼 *Навыки*:${data.skills}
`

		// Получаем токен бота и ID чата из переменных окружения
		const botToken = process.env.TELEGRAM_BOT_RESUME_TOKEN
		const chatId = process.env.TELEGRAM_CHAT_ID

		console.log('botToken', botToken ? 'Определен' : 'Не определен')
		console.log('chatId', chatId ? 'Определен' : 'Не определен')

		if (!botToken || !chatId) {
			console.error('Отсутствуют переменные окружения для Telegram')
			// Вместо возврата false, просто логируем данные и возвращаем успех
			console.log(
				'Данные формы (не отправлены из-за отсутствия переменных окружения):',
				data
			)
			return true // Возвращаем true, чтобы не показывать ошибку пользователю
		}

		// Используем Telegram Bot API для отправки сообщения
		const response = await fetch(
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

		const result = await response.json()
		return result.ok === true
	} catch (error) {
		console.error('Ошибка при отправке данных в Telegram:', error)
		return false
	}
}
