# Use the official Node.js image from the Docker Hub
FROM node:20.11

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env .env

EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]
