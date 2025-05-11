# Use the official Node.js 20 image as the base
FROM node:20

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and install dependencies
COPY frontend/package.json frontend/pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend code
COPY frontend/ .

# Expose the port (if needed for your app)
EXPOSE 3000

# Command to run your app (adjust this as needed)
CMD ["npm", "start"]
