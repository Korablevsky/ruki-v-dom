FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Установка необходимых пакетов
RUN apk add --no-cache libc6-compat

# Копируем package.json и package-lock.json
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Аргументы для сборки
ARG TELEGRAM_BOT_RESUME_TOKEN
ARG TELEGRAM_BOT_ORDER_TOKEN
ARG TELEGRAM_CHAT_ID

# Устанавливаем переменные из аргументов (с значениями по умолчанию)
ENV TELEGRAM_BOT_RESUME_TOKEN=${TELEGRAM_BOT_RESUME_TOKEN:-test_token}
ENV TELEGRAM_BOT_ORDER_TOKEN=${TELEGRAM_BOT_ORDER_TOKEN:-test_token}
ENV TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID:-test_id}

# Отображаем информацию о версиях
RUN node -v
RUN npm -v

# Собираем приложение
RUN npm run build

# Команда для запуска приложения
CMD ["npm", "start"]
