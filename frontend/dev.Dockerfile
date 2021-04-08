FROM node:15-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 10000000

COPY src src
COPY public public
COPY config-overrides.js ./

CMD yarn start