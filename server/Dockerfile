FROM node:lts-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]