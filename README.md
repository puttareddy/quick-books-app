# Quick-Books-App

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

Please note to set the MONGO_DB_URL ENV variable, if you would like to play with MongoDB for database before you 
start the server. Here is the sample format of the MongoDB URL for reference
```
$ set MONGO_DB_URL=mongodb://example:example@exmple.mongolab.com:53312/database
```

To start the application with sample data, issue the command as  
```
$ yarn .
```

## Tests
```sh
$ yarn build      # Runs eslint, code coverage, cucumber tests and nsp check
```

## Front End application

To play aroud with the Front End application in specific environment mode, specify the NODE_ENV argument appropriately. For instance, start the 
application in ```dev``` mode, issue the below command:

```
$ cd quick-books-api/client
$ npm install
$ npm run dev
```

Read [Client Application] for more details to play with

[Client Application]: <client/README.md>

# Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

## Production deploy with Docker

* Production deployment with compose:
```bash
$ docker-compose -f docker-compose.yml up -d
```

* Production deployment with just Docker:
```bash
$ docker build -t app -f Dockerfile .
$ docker run -p 4000:4000
```

