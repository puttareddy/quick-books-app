FROM node:alpine

# Set application working directory
RUN mkdir -p /app
WORKDIR /app

# 80 = HTTP, 443 = HTTPS, 3000 = Looback.JS server
EXPOSE 80 443 4000 35729 8080

# Copies the local package.json file to the container
# and utilities docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
# Install npm packages
COPY package.json /app/package.json
RUN npm install

# Set development environment as default
ENV NODE_ENV production
ENV MONGO_DB_URL mongodb://example:example@ds053312.mongolab.com:53312/todolist

# Add files needed to build the app
# Copy the application `src` folder inside the container
COPY . /app
RUN echo `ls /app`

CMD ["npm", "start"]
