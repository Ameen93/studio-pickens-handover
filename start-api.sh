#!/bin/bash

# Studio Pickens API Server Startup Script
# This script starts only the Express API server

echo "🚀 Starting Studio Pickens API Server..."
echo "========================================"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory"
    exit 1
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found. Make sure you're in the project directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for existing API server on port 3001
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use (API server)"
    echo "Stopping existing API server..."
    pkill -f "node server.js" 2>/dev/null || true
    sleep 2
fi

# Start API server
echo "🚀 Starting Express API server..."
echo "API server will be available at: http://localhost:3001"
echo "Admin panel (if React is running): http://localhost:3000/admin"
echo "Press Ctrl+C to stop the API server"
echo "========================================"

node server.js &
API_PID=$!

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping API server..."
    if [ -n "$API_PID" ]; then
        kill $API_PID 2>/dev/null
    fi
    echo "✅ API server stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for the process
wait $API_PID