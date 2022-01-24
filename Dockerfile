FROM node:16.13.2 AS buildpack

LABEL org.opencontainers.image.source https://github.com/keinsell/timo

ENV PORT 80
ENV HOST localhost

COPY . /app
WORKDIR /app

RUN yarn install
RUN yarn build

EXPOSE ${PORT}

CMD [ "node", "dist/index.js" ]