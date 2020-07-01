FROM node:lts-alpine

WORKDIR /server
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
