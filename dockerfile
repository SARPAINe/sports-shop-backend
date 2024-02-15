# Use an official Node.js runtime as a base image
FROM node:20

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use nodemon to run your application
CMD ["nodemon", "app.js"]
