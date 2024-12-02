# Use official Node.js image as base
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

# Copy the application files
COPY . .

# Expose the port for the service
EXPOSE 3002


# Command to run the application
CMD ["npm", "run", "dev"]
