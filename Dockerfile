# Use an official Node.js runtime as a parent image
FROM node:22-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final
FROM node:22-alpine3.19 AS final
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Command to run the application
ENTRYPOINT ["node", "dist/index.js"]

# Uncomment the following line for debugging this image
# ENTRYPOINT ["tail", "-f", "/dev/null"]