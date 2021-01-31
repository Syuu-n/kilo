FROM node:14-alpine

ENV APP_ROOT /usr/src/app

WORKDIR $APP_ROOT

COPY ./package.json $APP_ROOT
COPY ./yarn.lock $APP_ROOT

RUN yarn install
RUN yarn cache clean

COPY . $APP_ROOT

EXPOSE 3000