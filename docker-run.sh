#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}===== Запуск Docker-контейнера для ruki-v-dom =====${NC}"

# Остановка и удаление существующего контейнера
echo -e "${YELLOW}Остановка и удаление существующего контейнера...${NC}"
docker-compose down
docker rm -f ruki-v-dom 2>/dev/null

# Очистка кэша Docker
echo -e "${YELLOW}Очистка кэша Docker...${NC}"
docker system prune -f

# Проверка существования .env файла
if [ ! -f .env ]; then
  echo -e "${RED}Файл .env не найден. Создаю образец...${NC}"
  cat > .env << EOF
TELEGRAM_BOT_RESUME_TOKEN=test_token
TELEGRAM_BOT_ORDER_TOKEN=test_token
TELEGRAM_CHAT_ID=test_id
EOF
  echo -e "${YELLOW}Создан файл .env с тестовыми значениями. Отредактируйте его перед использованием в production.${NC}"
fi

# Сборка образа
echo -e "${YELLOW}Собираю Docker-образ...${NC}"
docker-compose build --no-cache

# Запуск контейнера в интерактивном режиме
echo -e "${YELLOW}Запускаю контейнер...${NC}"
docker-compose up -d

# Проверка статуса
echo -e "${YELLOW}Проверка статуса контейнера...${NC}"
sleep 3
if docker ps | grep -q ruki-v-dom; then
  echo -e "${GREEN}Контейнер успешно запущен!${NC}"
  echo -e "${YELLOW}Логи контейнера:${NC}"
  docker logs ruki-v-dom
else
  echo -e "${RED}Ошибка запуска контейнера!${NC}"
  echo -e "${YELLOW}Информация о контейнере:${NC}"
  docker ps -a | grep ruki-v-dom
  echo -e "${YELLOW}Логи контейнера:${NC}"
  docker logs ruki-v-dom
  
  echo -e "${YELLOW}Запускаю интерактивный режим для отладки...${NC}"
  echo -e "${YELLOW}Выполните команду: docker-compose run --rm app sh${NC}"
  echo -e "${YELLOW}Внутри контейнера выполните: ls -la && cat package.json${NC}"
fi

echo -e "${YELLOW}===== Запуск завершен =====${NC}" 