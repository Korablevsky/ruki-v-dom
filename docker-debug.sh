#!/bin/bash

echo "===== Проверка Docker-контейнера для ruki-v-dom ====="
echo ""

# Проверка состояния контейнера
echo "Статус контейнера:"
docker ps -a | grep ruki-v-dom

echo ""
echo "Логи контейнера (последние 50 строк):"
docker logs ruki-v-dom --tail 50

echo ""
echo "Проверка файловой структуры внутри контейнера:"
docker exec -it ruki-v-dom ls -la 2>/dev/null || echo "Не удалось подключиться к контейнеру (вероятно, он не запущен)"

echo ""
echo "Проверка наличия файла server.js:"
docker exec -it ruki-v-dom ls -la server.js 2>/dev/null || echo "Файл server.js не найден или контейнер не запущен"

echo ""
echo "Проверка структуры .next директории:"
docker exec -it ruki-v-dom ls -la .next 2>/dev/null || echo ".next директория не найдена или контейнер не запущен"

echo ""
echo "===== Рекомендации по исправлению ====="
echo "1. Проверьте package.json на предмет правильности команд сборки"
echo "2. Запустите сборку с отладкой: docker-compose build --no-cache app"
echo "3. Запустите контейнер с интерактивным режимом: docker-compose run --rm app sh" 