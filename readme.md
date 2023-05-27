# Bank Management System

This is the README file for the Bank Management System. It provides information about the available commands and how to use them.

## Prerequisites

- Docker
- Docker Compose

## Tech Stack

- Backend: Laravel
- Frontend: Next.js
- CSS Framework: Tailwind CSS

## Getting Started

1. Clone the repository:

```shell
    git clone https://github.com/robiokidenis/BankManagementSystem.git
 ```

2. Navigate to the project directory:
```shell
    cd project-directory
```

3. Build and run application:
   #### Using docker and docker-compose
   ```
   make up
   ```
   #### Without dokcer and docker-compose
   [Backend README](./backend/README.md)

   [Frontend README](./frontend/README.md)

    
4. Access the application:
  
 - fronend
    -- Open your web browser and visit http://127.0.0.0.1:3000
 - backend
    -- Open your web browser and visit http://127.0.0.0.1:8000
    
5. Default Credentials:

    - Email: robiokidenis@gmail.com
    - Password: password


Available Commands

- `make up`: Builds and runs the Docker containers.
- `make frontend`: Builds the Frontend application using yarn and starts the production server.
- `make frontend-dev`: Builds and runs the Frontend application in development mode.
- `make backend`: Installs dependencies, performs database migrations and seeding, and starts the Backend server.
- `make database`: Creates an empty SQLite database file.
- `make down`: Stops and removes the Docker containers.


## Screensort

 
 -- bank account
    ![bank-account](https://github.com/robiokidenis/BankManagementSystem/blob/master/screenshots/bank-account.png)
 -- history
    ![History](https://github.com/robiokidenis/BankManagementSystem/blob/master/screenshots/history.png)
   


## Troubleshooting

### CORS Error
If you encounter a CORS error, make sure that you have correctly set the `APP_URL` and `FRONTEND_URL` values in the backend's `.env` file. The `APP_URL` should be set to `http://127.0.0.1:8000` and the `FRONTEND_URL` should be set to `http://127.0.0.1:3000` to match the default backend and frontend server addresses. If you are using different addresses or ports, adjust the values accordingly.



### Frontend Build Error

If you encounter an error during the frontend build process, such as a build failure or unexpected behavior, you can try using the development server instead. To do so, follow these steps:

1. Navigate to the `Frontend` directory: `cd Frontend`
2. Install the dependencies: `yarn`
3. Start the frontend development server: `yarn dev`

The development server provides a live development environment with hot reloading, which can help in resolving build-related issues. The frontend development server will be accessible at `http://localhost:3000`.

