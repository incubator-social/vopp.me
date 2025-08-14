# 1. Базовый образ
FROM node:20.11-alpine as base
WORKDIR /app
RUN corepack enable

# 2. Установка ВСЕХ зависимостей (включая devDependencies)
FROM base as dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 3. Этап сборки
FROM base as builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm run build