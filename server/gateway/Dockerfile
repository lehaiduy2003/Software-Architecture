# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
