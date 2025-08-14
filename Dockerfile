# Базовый образ с установкой зависимостей
FROM node:20.11-alpine as base
WORKDIR /app
RUN corepack enable
RUN apk add --no-cache git

# Установка зависимостей
FROM base as dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm add -D @types/testing-library__jest-dom
RUN pnpm install --frozen-lockfile

# Сборка проекта
FROM base as builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm add -D @types/testing-library__jest-dom
RUN pnpm run build

# Финальный образ
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]