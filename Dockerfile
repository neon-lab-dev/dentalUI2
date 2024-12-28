# Use Node 18 (LTS) instead of 14
FROM --platform=linux/arm64/v8 node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose ports
EXPOSE 3000 8080

# Start the application in development mode
CMD ["npm", "run", "dev"]
