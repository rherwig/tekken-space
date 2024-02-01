FROM node:18-alpine AS node-pnpm

RUN npm i -g pnpm

FROM node-pnpm AS tekken-tools-base

ARG ORIGIN
ENV ORIGIN ${ORIGIN}

ARG GITHUB_OAUTH_CLIENT_ID
ENV GITHUB_OAUTH_CLIENT_ID ${GITHUB_OAUTH_CLIENT_ID}

ARG GITHUB_OAUTH_CLIENT_SECRET
ENV GITHUB_OAUTH_CLIENT_SECRET ${GITHUB_OAUTH_CLIENT_SECRET}

WORKDIR /app
EXPOSE 4200

RUN mkdir -p var/cache var/logs var/data
COPY ./dist/apps/frontend .
COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm install --production --frozen-lockfile --ignore-scripts

CMD ["node", "server/entry.express.mjs"]
