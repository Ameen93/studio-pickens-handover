#!/bin/bash

# Studio Pickens Application Startup Script
# This script starts MongoDB and runs the Payload CMS admin panel

echo "🎬 Starting Studio Pickens Application..."
echo "========================================"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ Error: MongoDB is not installed or not in PATH"
    echo "Please install MongoDB first: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

# Start MongoDB service
echo "🗄️  Starting MongoDB service..."
sudo systemctl start mongod

# Check if MongoDB started successfully
if sudo systemctl is-active --quiet mongod; then
    echo "✅ MongoDB started successfully"
else
    echo "❌ Failed to start MongoDB"
    echo "Please check MongoDB installation and try again"
    exit 1
fi

# Wait a moment for MongoDB to fully initialize
echo "⏳ Waiting for MongoDB to initialize..."
sleep 2

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for existing processes on the ports we need
echo "🧹 Checking for existing processes..."

# Check for React dev server on port 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3000 is already in use (React dev server)"
    echo "✅ React server is already running - will only start API server"
    REACT_SKIP=true
else
    echo "✅ Port 3000 is available - will start both servers"
    REACT_SKIP=false
fi

# Check for API server on port 3001
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 3001 is already in use (API server)"
    echo "🛑 Stopping existing API server..."
    pkill -f "node server.js" 2>/dev/null || true
    sleep 2
    echo "✅ Existing API server stopped"
else
    echo "✅ Port 3001 is available"
fi

# Start API server
echo "🚀 Starting Express API server..."
echo "API server will be available at: http://localhost:3001"
node server.js &
API_PID=$!

# Start React server if not skipped
if [ "$REACT_SKIP" = "false" ]; then
    echo "🚀 Starting React development server..."
    echo "React app will be available at: http://localhost:3000"
    echo "Admin panel will be available at: http://localhost:3000/admin"
    echo "Press Ctrl+C to stop both servers"
    echo "========================================"
    
    BROWSER=none PORT=3000 npm start &
    REACT_PID=$!
else
    echo "📝 React server skipped (already running)"
    echo "API server will be available at: http://localhost:3001"
    echo "React app should be available at: http://localhost:3000"
    echo "Admin panel should be available at: http://localhost:3000/admin"
    echo "Press Ctrl+C to stop API server"
    echo "========================================"
    REACT_PID=""
fi

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    if [ -n "$API_PID" ]; then
        kill $API_PID 2>/dev/null
    fi
    if [ -n "$REACT_PID" ]; then
        kill $REACT_PID 2>/dev/null
    fi
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
