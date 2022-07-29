FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
COPY .env.local .env

CMD ["npm", "run", "start:dev"]