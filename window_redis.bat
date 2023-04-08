@echo off

:: Install Node.js and npm
choco install nodejs-lts -y

:: Create a new folder for your project
mkdir myproject
cd myproject

:: Initialize your project with npm
npm init -y

:: Install TypeScript as a development dependency
npm install --save-dev typescript

:: Create a tsconfig.json file
npx tsc --init

:: Add a script to your package.json file that runs your TypeScript code using ts-node
npm install --save-dev ts-node
npm install --save-dev @types/node
npm install --save-dev tslib

:: Add this script to your package.json file
:: "dev": "ts-node src/index.ts"

echo Project setup complete!