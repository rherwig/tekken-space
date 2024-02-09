FROM node:20-alpine AS node-pnpm

EXPOSE 3000

ARG ORIGIN
ENV ORIGIN ${ORIGIN}

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

WORKDIR /app

RUN mkdir -p var/cache var/logs var/data

COPY ./.output/ .

CMD ["node", "server/index.mjs"]
