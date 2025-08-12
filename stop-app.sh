#!/bin/bash

# Studio Pickens Application Stop Script
# This script stops the Payload server and MongoDB service

echo "🛑 Stopping Studio Pickens Application..."
echo "========================================"

# Stop any running Node.js processes (Express server and React dev server)
echo "🔄 Stopping Express server..."
pkill -f "node server.js" 2>/dev/null || echo "ℹ️  No Express server process found"

echo "🔄 Stopping React development server..."
pkill -f "react-scripts start" 2>/dev/null || echo "ℹ️  No React dev server process found"

# Stop MongoDB service
echo "🗄️  Stopping MongoDB service..."
sudo systemctl stop mongod

# Check if MongoDB stopped successfully
if sudo systemctl is-active --quiet mongod; then
    echo "⚠️  MongoDB may still be running"
else
    echo "✅ MongoDB stopped successfully"
fi

echo "✅ Application stopped"
echo "========================================"
