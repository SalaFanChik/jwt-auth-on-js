# Стейдж 1: Сборка
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем весь исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Проверяем содержимое папки .next после сборки
RUN ls -la .next

# Стейдж 2: Запуск приложения
FROM node:18-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем необходимые файлы из стейджа сборки
COPY --from=builder /app/.next ./.next/
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Настраиваем права доступа (если нужно)
RUN chown -R node:node /app/.next

# Открываем порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
