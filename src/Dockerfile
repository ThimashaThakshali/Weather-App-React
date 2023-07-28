# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if using npm) to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the React application will run (usually port 3000)
EXPOSE 3000

# Set the command to start the React application
CMD ["npm", "start"]
