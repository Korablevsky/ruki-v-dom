This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy with Docker

Для развертывания приложения с помощью Docker:

1. Убедитесь, что у вас установлены Docker и Docker Compose
2. Запустите сборку и запуск контейнера:

```bash
# Сборка образа
docker-compose build

# Запуск контейнера
docker-compose up -d
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ruki-v-dom

## Настройка отправки заявок в Telegram

Для настройки отправки заявок в Telegram необходимо:

1. Создать бота через [@BotFather](https://t.me/BotFather) и получить токен бота
2. Получить ID чата или канала, куда будут отправляться заявки
3. Создать файл `.env.local` в корне проекта со следующими переменными:

```bash
# Телеграм бот для отправки заявок
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token_here
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id_here
```

Где:

- `your_bot_token_here` - токен вашего бота
- `your_chat_id_here` - ID чата или канала
