FROM registry-docker.rightknights.com/open/node:18-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 首先只复制依赖相关文件以利用缓存
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# 安装依赖并生成 Prisma Client
RUN pnpm install --frozen-lockfile
RUN npx prisma generate

# 复制其余项目文件
COPY . .

# 构建应用
RUN pnpm build-prod

FROM registry-docker.rightknights.com/open/node:18-alpine AS runner

RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 从构建阶段复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# 只复制 Prisma 必要文件
# RUN ls -l /app/node_modules/.pnpm/@prisma+client@6.0.0_prisma@6.0.0/node_modules/
# COPY --from=builder /app/node_modules/.pnpm/@prisma+client@6.0.0_prisma@6.0.0/node_modules/.prisma /app/node_modules/.prisma
# COPY --from=builder /app/node_modules/.pnpm/@prisma+client@6.0.0_prisma@6.0.0/node_modules/@prisma /app/node_modules/@prisma
# COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

