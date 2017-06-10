# Get NodeJS image
FROM node:latest

MAINTAINER Florian Hammerschmidt <florianh89@gmail.com>

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
