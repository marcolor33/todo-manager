# todo-manager
Todo manager
## Project Initialization

PG admin: http://localhost:5050 (email "admin@gmail.com", pw: admin)

Backend openAPI Swagger: http://localhost:3001/openapi

Backend openAPI Swagger: http://localhost:3001/openapi-json

Backend endpoint: http://localhost:3001

Frontend endpoint: http://localhost:3000

To initialize the `todo-manager` project, follow these steps:
## Project Initialization (with VSCode)
To initialize the `todo-manager` project, follow these steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/marcolor/todo-manager.git
    ```
2. Open the project in Visual Studio Code using the Dev Container extension.
3. Navigate to the project directory:
    ```bash
    docker compose -f "docker-compose.yml" up -d --build
    ```

## Project Initialization (without VSCode)
To initialize the `todo-manager` project, follow these steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/marcolor/todo-manager.git
    ```
2. Open the project in Visual Studio Code using the Dev Container extension.
3. Navigate to the project directory:
    ```bash
    docker compose -f "docker-compose.yml" up -d --build
    ```


1. Clone the repository:
    ```bash
    git clone https://github.com/marcolor/todo-manager.git
    ```

2. Create `.env` in root:
    ```bash
    cp .devcontainer/devcontainer.env .env
    ```

3. Navigate to the project directory:
    ```bash
    docker compose -f "docker-compose.yml" up -d --build
    ```

Now you are ready to start managing your todos with the `todo-manager` application!
