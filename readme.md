# Bank Management System

This is the README file for the Bank Management System. It provides information about the available commands and how to use them.


## Features
The Application includes the following features:

- Register: Users can register for a new account.
- Login: Registered users can log in to their accounts.
- Bank Account: Users can create and manage bank accounts.
- Deposit: Users can deposit money into their bank accounts.
- Money Transfer: Users can transfer money between their bank accounts or to other users.
- Transaction History: Users can view their transaction history.

## Prerequisites

- Docker
- Docker Compose

## Tech Stack

- Backend: Laravel,
- Frontend: Next.js & Typescript
- CSS Framework: Tailwind CSS 

## Getting Started

1. Clone the repository:

```shell
    git clone https://github.com/robiokidenis/BankManagementSystem.git
 ```

2. Navigate to the project directory:
```shell
    cd BankManagementSystem
```

3. Build and run application:
   #### Using docker and docker-compose
   ```
   make up
   ```
   #### Without docker and docker-compose
   [Backend README](./Backend/README.md)

   [Frontend README](./Frontend/README.md)

    
4. Access the application:
  
 - fronend
    -- Open your web browser and visit http://127.0.0.0.1:3000
 - backend
    -- Open your web browser and visit http://127.0.0.0.1:8000
    
5. Default Credentials:
  ```
     email: admin@email.com
     password: password
   ```


Available Commands

- `make up`: Builds and runs the Docker containers.
- `make frontend`: Builds the Frontend application using yarn and starts the production server.
- `make frontend-dev`: Builds and runs the Frontend application in development mode.
- `make backend`: Installs dependencies, performs database migrations and seeding, and starts the Backend server.
- `make database`: Creates an empty SQLite database file.
- `make down`: Stops and removes the Docker containers.


## Screensort


 -- Demo Video
    ![Demo Video](https://youtu.be/M5Ulh1vjyyk?si=s1RerJX9dJZ5gpuc)
 -- bank account
    ![bank-account](https://github.com/robiokidenis/BankManagementSystem/blob/master/screenshots/bank-account.png)
 -- history
    ![History](https://github.com/robiokidenis/BankManagementSystem/blob/master/screenshots/history.png)
   


## ARCHITECTURES

### API Architecture:
User Authentication:

- `POST /register`: Register a new user.
- `POST /login`: Authenticate the user.
- `POST /logout`: Log out the authenticated user.
- `GET /me`: Get the current user's information.

Bank Account Management:

- `GET /bank-account`: Get the bank account details of the authenticated user.
- `GET /bank-account/{account_number}`: Get detailed information about a specific bank account.
- `POST /transfer`: Transfer money between bank accounts or to other users.
- `GET /transfers`: Get the transfer history of the authenticated user.
- `POST /deposit`: Deposit money into a specific bank account.
- `GET /deposits`: Get the deposit history of the authenticated user.
- `GET /bank-accounts`: Get a list of all bank accounts.
- `GET /transactions`: Get the transaction history of the authenticated user.
- `GET /users`: Get the list of recipients for money transfer.

## Troubleshooting

### CORS Error
If you encounter a CORS error, make sure that you have correctly set the `APP_URL` and `FRONTEND_URL` values in the backend's `.env` file. The `APP_URL` should be set to `http://127.0.0.1:8000` and the `FRONTEND_URL` should be set to `http://127.0.0.1:3000` to match the default backend and frontend server addresses. If you are using different addresses or ports, adjust the values accordingly.

### Backend Container cannot start
   If you encounter the following error during the container startup: 
   
   ``` 
   Warning: require(/var/www/vendor/autoload.php): Failed to open stream: No such file or directory in /var/www/artisan on line 18
   ```
   
   This error indicates that the vendor directory is missing. To resolve this issue, please run the following command before starting the container:
   
   
   ```sheel
   cd /Backend && composer install
   ```

### Frontend Build Error

If you encounter an error during the frontend build process, such as a build failure or unexpected behavior, you can try using the development server instead. To do so, follow these steps:

1. Navigate to the `Frontend` directory: `cd Frontend`
2. Install the dependencies: `yarn`
3. Start the frontend development server: `yarn dev`

The development server provides a live development environment with hot reloading, which can help in resolving build-related issues. The frontend development server will be accessible at `http://127.0.0.01:3000`.


