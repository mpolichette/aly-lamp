#!/bin/bash
cd /home/pi/aly-lamp

# Pull the latest code
git pull origin main

# Install new dependencies if needed
npm install

# Start the app
exec npm run build && exec npm run start
