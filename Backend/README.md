# Backend For BANK MANAGEMENT SYSTEM

This project contains the backend component of the application. Follow the instructions below to set up and run the backend.

## Prerequisites

- PHP
- Composer

## Getting Started

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project directory.

### Installation

1. Install backend dependencies:
   ```shell
   composer install
   ```
2. Set up the database:

    - Create a new SQLite database file:
        ```shell
        touch database/database.sqlite
        ```
    - Configure the database connection in the .env file (copy .env.example and update it with your database details if needed).
3. Run database migrations and seed the database:
    ```shell
    php artisan migrate:fresh --seed
    ```
4. Starting the Server
    ```shell
    php artisan serve
    ```
    This will start the backend server at the specified address 
    http://127.0.0.1:8000

