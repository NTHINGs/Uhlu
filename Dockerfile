#Create our image from Node 6.9-alpine
FROM node:9-alpine

MAINTAINER Mauricio Martinez <uhluscout@gmail.com>

#Create a new directory to run our app.
RUN mkdir -p /usr/src/app

#Set the new directory as our working directory
WORKDIR /usr/src/app

#Copy all the content to the working directory
COPY . /usr/src/app

#install node packages to node_modules
RUN npm install

#Our app runs on port 8000. Expose it!
EXPOSE 8080

#Run the application.
CMD npm start