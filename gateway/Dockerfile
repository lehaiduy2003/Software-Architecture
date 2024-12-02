# Use official Node.js image as base
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
