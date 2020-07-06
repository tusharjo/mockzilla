FROM node:lts-alpine

WORKDIR /app/client
COPY client/package*.json /app/client/
RUN npm ci
COPY client/public /app/client/public
COPY client/src /app/client/src
RUN npm run build
RUN rm -rf /app/client

WORKDIR /app
COPY server/package*.json ./
RUN npm ci
COPY server/index.js ./server/

EXPOSE 8080
CMD [ "node", "server/index.js" ]