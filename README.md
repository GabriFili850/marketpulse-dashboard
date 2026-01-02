# Etherscan Gas Price Monitor
This React application displays low, average, and high gas prices on the Ethereum network in real time. The app fetches gas oracle data from the Etherscan API and updates the displayed values every 15 seconds (or a configured interval). This tool can be useful for Ethereum users who want to keep track of gas prices to optimize transaction costs.

## Features
Displays low, average, and high gas prices in Gwei format

Automatically refreshes gas price data every 15 seconds

Countdown timer showing the time remaining until the next refresh

Responsive and mobile-friendly design


## Setup
To set up the Etherscan Gas Price Monitor, follow these steps:

### Clone the repository:

git clone https://github.com/GabriFili850/etherscan-gas-price-monitor.git

cd etherscan-gas-price-monitor

### Install the required dependencies:

`npm install`

### Create a .env.local file to store your Etherscan API key:

`touch .env.local`

### Open the .env.local file and add your Etherscan API key:

`REACT_APP_ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY`

Replace YOUR_ETHERSCAN_API_KEY with your actual Etherscan API key. You can obtain one by signing up at https://etherscan.io/myapikey.

### Optional: configure the refresh interval (milliseconds):

`REACT_APP_REFRESH_INTERVAL_MS=15000`

### Start the development server:

`npm start`

The Etherscan Gas Price Monitor app should now be running on http://localhost:3000.

### Technologies Used
React

Etherscan API

Axios

Styled Components

Create React App

Netlify (for deployment)

## Live Demo
Etherscan Gas Price Monitor is deployed on Netlify and can be accessed through this link:

https://etherscan-gas-price-monitor.netlify.app

Feel free to visit the live demo to see the app in action without needing to set up the project locally.
