FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json* yarn.lock* /app/
WORKDIR /app
RUN if [ -f yarn.lock ]; then yarn install --production --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci --omit=dev; \
    else npm install --production; fi

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn build

FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory and set proper permissions
RUN mkdir -p /app/.tmp/data && \
    mkdir -p /app/public/uploads && \
    chown -R node:node /app

WORKDIR /app

# Copy package files to root (needed for Strapi to find package.json)
COPY ./package.json package-lock.json* yarn.lock* /app/

# Copy production dependencies
COPY --from=production-dependencies-env /app/node_modules /app/node_modules

# Copy built files - Strapi expects config, src in specific locations
# We copy FROM dist's subdirectories TO /app root to maintain expected structure
COPY --from=build-env /app/dist/config /app/config
COPY --from=build-env /app/dist/src /app/src
COPY --from=build-env /app/dist/index.js /app/index.js
COPY --from=build-env /app/dist/tsconfig.tsbuildinfo /app/tsconfig.tsbuildinfo
COPY --from=build-env /app/public /app/public

# Set permissions for uploads and database directories
RUN chown -R node:node /app

# Use non-root user
USER node

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["yarn", "start"]

