# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

RUN npm install

# Copia TODO (incluyendo /src/Public)
COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
