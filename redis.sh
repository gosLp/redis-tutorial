#!/bin/bash

# Install Redis
sudo apt-get update
sudo apt-get install redis-server

# Install Node.js
sudo apt-get update
sudo apt-get install nodejs

# Install npm
sudo apt-get install npm

# Install TypeScript
npm install -g typescript

# Create a new TypeScript project
mkdir myproject
cd myproject
npm init -y
tsc --init

#install dependencies
npm install ts-node --save-dev
npm install --save-dev @types/node
npm install --save express ioredis connect-redis express-session @types/express @types/ioredis @types/connect-redis @types/express-session

#Create a new typescript file
touch src/index.ts


#Add a script to package.json
echo ' insert this into the scripts in package.json:  { "dev": "ts-node src/index.ts" } ' 
    
