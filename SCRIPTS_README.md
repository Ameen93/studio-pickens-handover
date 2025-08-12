# Studio Pickens - Application Scripts

This directory contains helper scripts to easily start and stop the Studio Pickens application.

## Scripts

### `start-app.sh`
Starts the complete application including:
1. MongoDB service
2. Payload CMS server

**Usage:**
```bash
./start-app.sh
```

**What it does:**
- Checks if MongoDB is installed
- Starts MongoDB service (`sudo systemctl start mongod`)
- Waits for MongoDB to initialize
- Installs npm dependencies if needed
- Runs the Payload server (`npm run payload`)

The admin panel will be available at: http://localhost:3000/admin

### `stop-app.sh`
Stops the application and cleans up processes:

**Usage:**
```bash
./stop-app.sh
```

**What it does:**
- Stops the Payload server process
- Stops MongoDB service (`sudo systemctl stop mongod`)

## Prerequisites

- MongoDB must be installed on your system
- Node.js and npm must be installed
- You must have sudo privileges to start/stop MongoDB service

## Manual Commands

If you prefer to run the commands manually:

```bash
# Start MongoDB
sudo systemctl start mongod

# Run Payload server
npm run payload

# Stop MongoDB (in another terminal)
sudo systemctl stop mongod
```

## Troubleshooting

- If MongoDB fails to start, check if it's already running: `sudo systemctl status mongod`
- If the port is already in use, check for other Node.js processes: `ps aux | grep node`
- Make sure you're in the project directory when running the scripts
