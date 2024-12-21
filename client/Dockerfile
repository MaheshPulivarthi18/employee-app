# Stage 1: Build the Angular application
FROM node:18-slim AS build

WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular application for production
RUN ng build --prod  # Use the production build for Angular

# Stage 2: Serve the Angular application using Nginx
FROM nginx:1.17.1-alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular build from the build stage to the Nginx directory
COPY --from=build /usr/src/app/.angular/client /usr/share/nginx/html


# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
