# Базовый образ
FROM node:20-alpine AS base
WORKDIR /app

# Установка зависимостей
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Сборка
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Переменные окружения для сборки
ARG TELEGRAM_BOT_RESUME_TOKEN
ARG TELEGRAM_BOT_ORDER_TOKEN
ARG TELEGRAM_CHAT_ID
ENV TELEGRAM_BOT_RESUME_TOKEN=${TELEGRAM_BOT_RESUME_TOKEN}
ENV TELEGRAM_BOT_ORDER_TOKEN=${TELEGRAM_BOT_ORDER_TOKEN}
ENV TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
# Оптимизация для production
ENV NODE_ENV=production
RUN npm run build

# Финальный образ
FROM base AS runner
ENV NODE_ENV=production
# Переменные окружения для запуска
ARG TELEGRAM_BOT_RESUME_TOKEN
ARG TELEGRAM_BOT_ORDER_TOKEN
ARG TELEGRAM_CHAT_ID
ENV TELEGRAM_BOT_RESUME_TOKEN=${TELEGRAM_BOT_RESUME_TOKEN}
ENV TELEGRAM_BOT_ORDER_TOKEN=${TELEGRAM_BOT_ORDER_TOKEN}
ENV TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    # Добавим curl для healthcheck
    apk add --no-cache curl

WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Запуск приложения
CMD ["node", "server.js"]
