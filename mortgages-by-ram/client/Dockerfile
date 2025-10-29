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

# Install wget for health checks and dumb-init for proper signal handling
RUN apk add --no-cache wget dumb-init

# Create app directory
RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

# Copy package files
COPY ./package.json package-lock.json* yarn.lock* /app/

# Copy production dependencies
COPY --from=production-dependencies-env /app/node_modules /app/node_modules

# Copy built files
COPY --from=build-env /app/build /app/build

# Set ownership
RUN chown -R node:node /app

# Use non-root user
USER node

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["yarn", "start"]