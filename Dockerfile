FROM node:18.16.1-alpine

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000/tcp

CMD [ "node", "dist/main.js" ]

