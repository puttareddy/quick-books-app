# Quick-Books-App

A FULL Stack application based on MongoDB + LoopbackJS + ReactJS + Node.js technologies. 
You can refer [Sample Application](https://quick-books-app.herokuapp.com/) for implementation 

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Loopback - The best way to understand loopback is through its [Official Website](https://loopback.io/doc/en/lb2/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* ReactJS - React's [Official Website](http://redux.js.org/docs/basics/UsageWithReact.html) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Webpack - You're going to use the [Webpack Package Manager](https://webpack.js.org/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g webpack
```

## Downloading Application
There are several ways you can get the QuickBooks Application:

### Cloning The GitHub Repository
The recommended way to get Application is to use git to directly clone the github repository:

```bash
$ git clone https://github.com/puttareddy/quick-books-app.git quick-books-app
```

This will clone the latest version of the repository to a **quick-books-app** folder.

### Downloading The Repository Zip File
Another way to use this application is to download a zip copy from the [master branch on GitHub](https://github.com/puttareddy/quick-books-app/archive/master.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/puttareddy/quick-books-app/archive/master.zip -O quick-books-app.zip; unzip quick-books-app.zip; rm quick-books-app.zip
```

Don't forget to rename **quick-books-app-master** after your project name.

## Quick Install
Once you've downloaded the application and installed all the prerequisites, you're just a few steps away using this application.

To install the dependencies, run this in the application folder from the command-line:

```bash
$ cd quick-books-app/server
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* To update these packages later on, just run `npm update`

## Running Your Application

Run your application using npm:

```bash
$ cd quick-books-app/server
$ NODE_ENV=production npm start
```

Please note to set the MONGO_DB_URL ENV variable, if you would like to play with MongoDB for database before you 
start the server. Here is the sample format of the MongoDB URL for reference
```
$ set MONGO_DB_URL=mongodb://example:example@exmple.mongolab.com:53312/database
```

To start the application with sample data, issue the command as  
```
$ npm start
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

## Folder Structure

After creation, your project should look like this:

```
 quick-books-app/
    client/
        README.md
        node_modules/
        package.json
        webpack.config.js
        server.js
        Dockerfile
        public/
            index.html
            favicon.ico
        src/
            components/
            containers/
            store/
            App.css
            App.js
            routes.js
        test/
    server/
        README.md
        node_modules/
        package.json
        Dockerfile
        common/
            models/
                customer.json
        server/
            boot/
            routes/
               migrate-data.js
            config.json
            datasources.json
            middleware.json
            server.js        
        test/
    SOLUTION.md
    README.md
    IMPROVEMENTS.md
    Procfile
    
```


## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

### Production deploy with Docker

* Production deployment with compose:
```bash
$ docker-compose -f docker-compose.yml up -d
```

* Production deployment with just Docker:
```bash
$ docker build -t app -f Dockerfile .
$ docker run -p 4000:4000
```

