# ProShop - MERN eCommerce App

## Features

1. Search any product by name using the search bar.
2. Store details like items in cart, payment methods, shipping address, etc in local storage. These values are loaded to redux store when application loads.
3. Uses PayPal to handle payments. Additional payment methods can also be added.
4. Redux used for global State Management.
5. Logged in users can drop product review. Average product rating is updated when a product is reviewed.
6. Separate section available for admin users that will be used to manage users, add or remove product, manage orders, etc.
7. JWT token based authentication used along with role based authorization.

## Installing Dependencies Steps

1. In project root run the below command

   ### `npm install`

2. Go to frontend folder and run the below command
   ### `npm install --legacy-peer-deps`

## Env and PayPal Setup Instructions

1. Copy the contents of .env.example into .env. After copying set the values as needed.
2. For PayPal Client go to [https://developer.paypal.com/home](https://developer.paypal.com/home) and login with your paypal credentials. Click on Apps and Credentials menu and create an app by following the instructions. After the app is created you can copy and use the client id. Make sure to be in Sandbox mode when testing payments.
3. Note:- Verified PayPal needed to use PayPal services.

## Commands(Run in development mode)

1. Run the backend server by running command below

   ### `npm run server`

2. Run the frontend react app by running command below

   ### `npm run client`

3. Run the backend server and frontend react application concurrently by running the command below
   ### `npm run dev`

## Future Updates OR Feature additions

1. Add feature to store and use multiple delivery addresses for users.
2. Add merchant UI interface to allow merchants to add and show their products.
