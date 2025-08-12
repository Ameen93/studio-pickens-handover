#!/bin/bash

# Studio Pickens Production Startup Script
# This script configures and starts the application in production mode

echo "🚀 Starting Studio Pickens in Production Mode..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from .env.production..."
    if [ -f ".env.production" ]; then
        cp .env.production .env
        echo "✅ .env file created from .env.production"
        echo "🔐 IMPORTANT: Please update JWT_SECRET and ADMIN_PASSWORD in .env file"
    else
        echo "❌ .env.production file not found. Please create it first."
        exit 1
    fi
fi

# Check if required environment variables are set
echo "🔍 Checking environment configuration..."

if grep -q "CHANGE-THIS-TO-A-STRONG-SECRET-KEY" .env; then
    echo "❌ JWT_SECRET not configured. Please update .env file with a strong secret key."
    echo "💡 Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    exit 1
fi

if grep -q "CHANGE-THIS-TO-A-STRONG-PASSWORD" .env; then
    echo "❌ ADMIN_PASSWORD not configured. Please update .env file with a strong password."
    exit 1
fi

if grep -q "yourdomain.com" .env; then
    echo "⚠️  CORS_ORIGIN contains placeholder domain. Please update with your actual domain."
    echo "🔧 Current setting: $(grep CORS_ORIGIN .env)"
fi

echo "✅ Environment configuration check complete"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p public/images/uploads
mkdir -p data

# Build frontend for production
echo "🏗️  Building frontend for production..."
npm run build

# Start the server
echo "🚀 Starting production server..."
echo "📊 Server will be available at: http://localhost:3001"
echo "🔧 Admin panel: http://localhost:3001/admin"
echo "❤️  Health check: http://localhost:3001/api/health"

# Set production environment and start server
NODE_ENV=production npm run server