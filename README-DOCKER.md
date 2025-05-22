# Инструкция по настройке Docker для проекта ruki-v-dom

## Подготовка переменных окружения

1. Создайте файл `.env` в корне проекта со следующими переменными:

```
TELEGRAM_BOT_RESUME_TOKEN=your_resume_token_here
TELEGRAM_BOT_ORDER_TOKEN=your_order_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Замените значения на реальные токены и ID чата.

## Сборка и запуск с помощью Docker

### Запуск с помощью docker-compose (рекомендуется)

```bash
# Очистка предыдущей сборки (если нужно)
docker-compose down
docker system prune -f

# Сборка и запуск контейнера
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Остановка контейнера
docker-compose down
```

### Запуск вручную с помощью Docker

```bash
# Сборка образа
docker build \
  --build-arg TELEGRAM_BOT_RESUME_TOKEN=your_resume_token_here \
  --build-arg TELEGRAM_BOT_ORDER_TOKEN=your_order_token_here \
  --build-arg TELEGRAM_CHAT_ID=your_chat_id_here \
  -t ruki-v-dom .

# Запуск контейнера
docker run -d -p 3000:3000 \
  -e TELEGRAM_BOT_RESUME_TOKEN=your_resume_token_here \
  -e TELEGRAM_BOT_ORDER_TOKEN=your_order_token_here \
  -e TELEGRAM_CHAT_ID=your_chat_id_here \
  --name ruki-v-dom ruki-v-dom
```

## Устранение неполадок

### Контейнер постоянно перезапускается

1. Проверьте логи контейнера:

```bash
docker logs ruki-v-dom
```

2. Запустите скрипт диагностики:

```bash
./docker-debug.sh
```

3. Попробуйте запустить контейнер в интерактивном режиме:

```bash
docker-compose run --rm app sh
```

4. Проверьте наличие файла server.js внутри контейнера:

```bash
docker run --rm ruki-v-dom ls -la
```

5. Проверьте сборку Next.js в интерактивном режиме:

```bash
# Войдите в контейнер builder
docker build --target builder -t ruki-v-dom-builder .
docker run -it --rm ruki-v-dom-builder sh

# Внутри контейнера запустите
ls -la .next
cat .next/standalone/server.js
```

## Важные замечания

1. В production окружении всегда используйте реальные значения переменных
2. Не загружайте файл `.env` в репозиторий
3. Приложение доступно на порту 3000 после запуска
4. Для обновления приложения остановите контейнер, затем соберите и запустите его снова
