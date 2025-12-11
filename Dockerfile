# ------------------------------
# Base image
# ------------------------------
FROM node:20-alpine AS base
WORKDIR /app

# ------------------------------
# Stage 1: Install dependencies
# ------------------------------
FROM base AS deps

# Copy only package files for caching
COPY package.json package-lock.json ./

# Upgrade npm to match Next.js 15 requirements
RUN npm install -g npm@11.5.2

# Clear npm cache to avoid corrupted installs
# RUN npm cache clean --force

# Install dependencies safely
RUN npm install --legacy-peer-deps

# ------------------------------
# Stage 2: Build Next.js
# ------------------------------
FROM base AS builder
WORKDIR /app

# Build-time environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_ESEWA_MERCHANT_CODE
ARG NEXT_PUBLIC_ESEWA_SUCCESS_URL
ARG NEXT_PUBLIC_ESEWA_FAILURE_URL
ARG NEXT_PUBLIC_ESEWA_PAYMENT_URL
ARG NEXT_PUBLIC_ESEWA_SECRET

# Set environment for build
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_ESEWA_MERCHANT_CODE=$NEXT_PUBLIC_ESEWA_MERCHANT_CODE
ENV NEXT_PUBLIC_ESEWA_SUCCESS_URL=$NEXT_PUBLIC_ESEWA_SUCCESS_URL
ENV NEXT_PUBLIC_ESEWA_FAILURE_URL=$NEXT_PUBLIC_ESEWA_FAILURE_URL
ENV NEXT_PUBLIC_ESEWA_PAYMENT_URL=$NEXT_PUBLIC_ESEWA_PAYMENT_URL
ENV NEXT_PUBLIC_ESEWA_SECRET=$NEXT_PUBLIC_ESEWA_SECRET
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npm run build

# ------------------------------
# Stage 3: Production image
# ------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone Next.js build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static    
COPY --from=builder /app/public ./public

# Optional: runtime tools
RUN apk add --no-cache curl tini

EXPOSE 3000

# Use tini as the entrypoint to handle zombie processes
ENTRYPOINT ["/sbin/tini", "--"]

# Start the app
CMD ["node", "server.js"]
