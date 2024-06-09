# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

RUN npm run build:server

# Start the development server
CMD ["npm", "run", "start:client"]

# Expose the port the application runs on
EXPOSE 8080
