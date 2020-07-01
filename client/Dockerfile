FROM node:lts-alpine

WORKDIR /client
COPY ./package*.json /client/
RUN npm ci

COPY . .
CMD [ "npm", "start" ]