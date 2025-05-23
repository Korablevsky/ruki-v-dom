# Docker для Next.js 15 проекта "Руки в дом"

## Требования

- Docker
- Docker Compose

## Сборка и запуск

### Использование Docker Compose (рекомендуется)

1. Соберите и запустите контейнер:

```bash
docker-compose up -d
```

2. Приложение будет доступно по адресу: http://localhost:3000

3. Для остановки контейнера:

```bash
docker-compose down
```

### Использование Docker напрямую

1. Соберите Docker-образ:

```bash
docker build -t ruki-v-dom .
```

2. Запустите контейнер:

```bash
docker run -p 3000:3000 ruki-v-dom
```

## Разработка с Docker

Для разработки вы можете создать отдельный docker-compose.dev.yml:

```yaml
version: '3'

services:
  nextjs-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: ruki-v-dom-dev
    restart: always
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
    command: npm run dev
```

И Dockerfile.dev:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

Затем запустите:

```bash
docker-compose -f docker-compose.dev.yml up -d
```
