# Use official Node.js image as base
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port for the service
EXPOSE 3001
