FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm ci

COPY . .

RUN npm run build


CMD [ "node", "dist/src/main.js" ]

