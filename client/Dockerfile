FROM node:lts-alpine

WORKDIR /client
COPY ./package*.json ./
RUN npm ci

COPY . .
CMD [ "npm", "start" ]