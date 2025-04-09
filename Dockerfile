# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npm run db:init

# Deploy Migrations (only if using migrations in prod)
RUN npm run db:deploy:prod

# Build the TypeScript project
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/server.js"]  