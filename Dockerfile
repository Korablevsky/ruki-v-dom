FROM node:20-alpine AS base

# Устанавливаем зависимости только для сборки
FROM base AS deps
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Установка переменных окружения во время сборки
ARG TELEGRAM_BOT_RESUME_TOKEN
ARG TELEGRAM_BOT_ORDER_TOKEN
ARG TELEGRAM_CHAT_ID

ENV TELEGRAM_BOT_RESUME_TOKEN=$TELEGRAM_BOT_RESUME_TOKEN
ENV TELEGRAM_BOT_ORDER_TOKEN=$TELEGRAM_BOT_ORDER_TOKEN
ENV TELEGRAM_CHAT_ID=$TELEGRAM_CHAT_ID

# Сборка приложения
RUN npm run build

# Запуск приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Создаем пользователя с ограниченными правами
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Копируем необходимые файлы из сборки
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переменные среды для запуска
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]
