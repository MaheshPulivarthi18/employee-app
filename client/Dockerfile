FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
RUN npm run build
FROM nginx:stable
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/client/browser .
CMD ["nginx", "-g", "daemon off;"]
