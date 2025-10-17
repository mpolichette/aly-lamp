#!/bin/bash
cd /home/pi/aly-lamp

# Pull the latest code
git pull origin main

# Install new dependencies if needed
/home/pi/.nvm/versions/node/v20.9.0/bin/npm install

# Build the app
/home/pi/.nvm/versions/node/v20.9.0/bin/npm build

# Start the app
exec /home/pi/.nvm/versions/node/v20.9.0/bin/node /home/pi/aly-lamp/dist/index.js
