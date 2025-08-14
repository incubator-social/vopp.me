# 1. Базовый образ с настройкой pnpm
FROM node:20.11-alpine as base
WORKDIR /app
# Устанавливаем единое хранилище для всех этапов
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    pnpm config set store-dir /pnpm/store && \
    pnpm install -g pnpm@latest

# 2. Этап установки зависимостей
FROM base as dependencies
COPY package.json pnpm-lock.yaml ./
# Устанавливаем ВСЕ зависимости сразу (включая devDependencies)
RUN pnpm install --frozen-lockfile

# 3. Этап сборки (builder)
FROM base as builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Теперь не нужно отдельно добавлять @types, они уже установлены
RUN pnpm run build

# 4. Финальный образ
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# Копируем только необходимое
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]