from node:latest as build

RUN mkdir -p /usr/src/songbookit/frontend
WORKDIR /usr/src/songbookit/frontend

COPY . .

RUN yarn install 
RUN yarn global add react-scripts

RUN yarn build

EXPOSE 3000

from nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html