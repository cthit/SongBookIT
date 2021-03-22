FROM node:15 as build-step

RUN mkdir -p /usr/src/songbook/frontend
RUN chown -R node /usr/src/songbook/frontend

USER node 

WORKDIR /usr/src/songbook/frontend

COPY ./src ./src
COPY ./public ./public
COPY package.json .
COPY config-overrides.js .

RUN yarn install 
RUN yarn global add react-scripts
RUN yarn build



FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build-step /usr/src/songbook/frontend/build/ /usr/share/nginx/html/

