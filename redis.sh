#!/bin/bash

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

#add tsnode to your project
npm install ts-node --save-dev
npm install --save-dev @types/node

#Add a script to package.json
"dev": "ts-node src/index.ts"