FROM node:20-alpine AS node

# Base Image
FROM node as base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@9.5.0 turbo@2.0.6

# Create pruned web application
FROM base as prune
WORKDIR /app

COPY . .
RUN turbo prune web --docker

# Install dependencies and build the application
FROM base as builder
WORKDIR /app

COPY --from=prune /app/out/full/.gitignore .
COPY --from=prune /app/out/full/ .
RUN pnpm install
RUN pnpm turbo run build --filter web...

# Serve the application
FROM base as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web/next.config.js .
COPY --from=builder /app/apps/web/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

RUN mkdir -p var/cache var/logs var/data

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "apps/web/server.js"]
