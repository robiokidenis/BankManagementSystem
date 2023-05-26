# Stage 1: Build the Next.js application
FROM node:14.17-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build


# Expose port 3000 for the HTTP server
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
