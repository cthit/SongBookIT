from node:latest

RUN mkdir -p /usr/src/songbookit/frontend
WORKDIR /usr/src/songbookit/frontend

COPY package.json /package.json

RUN yarn install 
RUN yarn global add react-scripts

EXPOSE 3000

CMD yarn start