# Stage 1: Build stage
FROM node:20 AS builder

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Alpine Runtime
FROM node:20-alpine
# install OpenSSL and other dependencies for the prisma client
RUN apk add --no-cache openssl musl-dev libc6-compat

# set working directory
WORKDIR /usr/src/app

# copy source code and result from build stage into container
COPY --from=builder /usr/src/app /usr/src/app

# Expose the port for the service
EXPOSE 3002
