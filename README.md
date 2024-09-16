# Проект с использованием Docker: Next.js, Express.js и PostgreSQL

Этот проект состоит из фронтенд-приложения на Next.js, бэкенд-приложения на Express.js и базы данных PostgreSQL, все это управляется с помощью Docker и Docker Compose.

Фронтенд не зависит от бэкенд приложения и работает отдельно, отправляя запросы в бэкенд

## Структура проекта

- **`client/`** - Папка с фронтенд-приложением на Next.js.
- **`server/`** - Папка с бэкенд-приложением на Express.js.
- **`docker-compose.yml`** - Конфигурационный файл Docker Compose для управления контейнерами.

## Требования

Для запуска проекта вам потребуются:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Установка и запуск

### 1. Склонируйте репозиторий

```bash
git clone https://github.com/SalaFanChik/jwt-auth-on-js
cd <имя-репозитория>
docker-compose build --no-cache
docker-compose up -d db
docker-compose up -d express
docker-compose up -d nextjs

http://localhost:3000/register - переходите и регистрируйтесь
```
