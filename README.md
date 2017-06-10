# quick-books-app

A FULL Stack application based on MongoDB + LoopbackJS + ReactJS + Node.js technologies. 
You can refer [Sample Application](https://quick-books-app.herokuapp.com/) for implementation 

## Local development and deployment

## Start the FULL stack application

To start the application in specific environment mode, specify the NODE_ENV argument appropriately. For instance, start the 
application in ```production``` mode, issue the below command:

```
$ git clone https://github.com/puttareddy/quick-books-app.git
$ cd quick-books-api
$ npm install
$ NODE_ENV=production yarn start
```

To start the application with sample data, issue the command as  
```
$ yarn .
```

## Tests
```sh
$ yarn build      # Runs eslint, code coverage, cucumber tests and nsp check
$
```

## Front End application

To play aroud with the Front End application in specific environment mode, specify the NODE_ENV argument appropriately. For instance, start the 
application in ```dev``` mode, issue the below command:

```
$ cd quick-books-api/client
$ npm install
$ npm run dev
$
```

Read [Client Application] for more details to play with

[Client Application]: <client/README.md>

# Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development and testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
$
```

* To enable live reload, forward port 35729 and mount /app and /public as volumes:
```bash
$ docker run -p 3000:3000 -p 35729:35729 -v /Users/mdl/workspace/mean-stack/mean/public:/home/mean/public -v /Users/mdl/workspace/mean-stack/mean/app:/home/mean/app --link db:db_1 mean
```

## Production deploy with Docker

* Production deployment with compose:
```bash
$ docker-compose -f docker-compose-production.yml up -d
```

* Production deployment with just Docker:
```bash
$ docker build -t mean -f Dockerfile-production .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
```

