FROM node:20-alpine AS base

WORKDIR /app

#ARG ORIGIN
#ENV ORIGIN ${ORIGIN}

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Install pnpm
RUN npm install -g pnpm @dotenvx/dotenvx


FROM base AS build

# Install dependencies
COPY package.json pnpm-lock.yaml prisma ./
RUN pnpm install
RUN pnpm rebuild sharp

# Build the app
COPY . .
RUN pnpm build


FROM base AS release

EXPOSE ${NUXT_PORT}

# Create directories for cache, logs and database
RUN mkdir -p var/cache var/logs var/data

# Copy build artifacts from previous stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output

CMD ["dotenvx", "run", "--env-file", ".env", "--", "node", ".output/server/index.mjs"]
