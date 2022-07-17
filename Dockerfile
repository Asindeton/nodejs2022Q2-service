FROM --platform=linux/amd64 node:16.15-alpine  AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production

FROM --platform=linux/amd64 node:16.15-alpine  AS production
WORKDIR /app
COPY --from=builder app/node_modules ./node_modules
COPY --from=builder app/dist ./dist
COPY --from=builder app/doc ./doc
COPY --from=builder app/package*.json ./
EXPOSE ${PORT}
CMD [ "npm", "run", "start:prod"]