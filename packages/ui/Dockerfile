FROM node:22-alpine AS node

# Base Image
FROM node as base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@10.5.2 turbo@2.4.4 serve@14.2.4

# Create pruned web application
FROM base as prune
WORKDIR /app

COPY . .
RUN turbo prune @tekken-space/ui --docker

# Install dependencies and build the application
FROM base as builder
WORKDIR /app

COPY --from=prune /app/out/full/.gitignore .
COPY --from=prune /app/out/full/ .
RUN pnpm install
RUN pnpm turbo run build --filter @tekken-space/ui...

# Serve the application
FROM caddy:2-alpine as runner
WORKDIR /srv

# Copy the Storybook static files
COPY --from=builder /app/packages/ui/storybook-static ./

# Copy the Caddyfile to Caddy's config directory
COPY packages/ui/.docker/Caddyfile /etc/caddy/Caddyfile

ENV PORT=3000
EXPOSE ${PORT}
