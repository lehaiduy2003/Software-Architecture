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

# Build the TypeScript code
RUN npm run build

# Stage 2: Alpine Runtime
FROM node:20-alpine

# Install build tools and dependencies for bcrypt and Prisma
RUN apk add --no-cache openssl musl-dev libc6-compat

# Set working directory
WORKDIR /usr/src/app

# Copy built files and package.json from builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Reinstall production dependencies to rebuild bcrypt for Alpine
RUN npm install --prefer-offline --no-audit

# Expose the port for the service
EXPOSE 3001
