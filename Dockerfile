FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN addgroup -g 1001 -S appuser && adduser -S appuser -u 1001
USER appuser

EXPOSE 5000

CMD ["node", "server.js"]