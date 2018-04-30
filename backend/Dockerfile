# Get NodeJS image
FROM node:latest

LABEL maintainer="florianh89@gmail.com"

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 1337
CMD ["npm", "start"]
