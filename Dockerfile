FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT ["npm", "run", "start:prod"]

# Uncomment the following line for debugging this image
# ENTRYPOINT ["tail", "-f", "/dev/null"]