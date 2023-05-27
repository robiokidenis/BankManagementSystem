# Project Name

This is the README file for the Project Name. It provides information about the available commands and how to use them.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/robiokidenis/BankManagementSystem.git

2. Navigate to the project directory:
```shell
    cd project-directory


3. Build and run the containers:
```shell
 make up
4. Access the application:
  
 - fronend
    -- Open your web browser and visit http://127.0.0.0.1:3000
 - backend
    -- Open your web browser and visit http://127.0.0.0.1:8000

Available Commands
`make up`: Builds and runs the Docker containers.
`make frontend`: Builds the Frontend application using yarn and starts the production server.
`make frontend-dev`: Builds and runs the Frontend application in development mode.
`make backend`: Installs dependencies, performs database migrations and seeding, and starts the Backend server.
`make database`: Creates an empty SQLite database file.
`make down`: Stops and removes the Docker containers.