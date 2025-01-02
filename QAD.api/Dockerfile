# Use official Node.js image from DockerHub
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY QAD.api/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your app's source code into the container
COPY . .

# Build the TypeScript code (optional if TypeScript is being used)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
