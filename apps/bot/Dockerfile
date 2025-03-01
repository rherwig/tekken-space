FROM node:22-alpine AS node

# Base Image
FROM node as base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@10.5.2 turbo@2.4.4

# Create pruned web application
FROM base as prune
WORKDIR /app

COPY . .
RUN turbo prune bot --docker

# Install dependencies and build the application
FROM base as runner
WORKDIR /app

COPY --from=prune /app/out/full/.gitignore .
COPY --from=prune /app/out/full/ .
RUN pnpm install
RUN pnpm turbo run build --filter bot...

COPY --from=prune /app/out/full/apps/bot/src/resources/moves/ ./apps/bot/dist/moves/

CMD ["node", "/app/apps/bot/dist/app.js"]
