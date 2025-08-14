# Базовый образ с активированным corepack
FROM node:20.11-alpine as base
WORKDIR /app
RUN corepack enable

# Устанавливаем зависимости
FROM base as dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM base as builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm run build:production

# Финальный образ
FROM base as runner
ENV NODE_ENV production
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["pnpm", "start"]