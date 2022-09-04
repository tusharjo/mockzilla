# MockZilla v1.1

## What is MockZilla?

MockZilla is an app where you can mock and store your own API calls and use those
calls wherever possible while development phase.

## MockZilla app url:

[View the live MockZilla app](https://mockzilla.com/)

## MockZilla architecture:

![alt text](https://github.com/tusharjo/mockzilla/blob/master/client/public/image/mockme-architecture.jpg?raw=true)

## How to setup MockZilla locally:

### docker-compose (recommended):

Go to /client directory create a new `.env.development` file and add this code

### `REACT_APP_API_URI=http://localhost:8080`

Then run this in your terminal:

#### `docker-compose up -d --build`

Once all containers bootup: You can access client from `http://localhost:3001`

### Manual Steps:

Goto /client directory and run

### `npm i`

### `npm start`

Check if your react server is running properly, then run this command:

### `npm run build`

This will generate build folder outside client directory.

Before starting up server, you will have to install redis.

Steps are as follows:

Install redis server on your local machine and run it on default port
[Redis Download](https://redis.io/download) and follow Mac/Windows installation
steps.

Once setup is done, start the redis server with:

### `redis-server`

Now navigate to /server directory create a new `.env` file and add this code

### `dev=development`

and run

### `npm i`

and

### `npm run dev`

Once it connects to redis server, you can visit port 8080:
[localhost:8080](http://localhost:8080)

Your server with react app is up and running on localhost!

## Production deployment of MockZilla:

Run root Dockerfile, it will output image.

Make sure you mention redis production version in `/server/index.js` Now you can
use this image to deploy on production.
