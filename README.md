# todo-manager
Todo manager
## Project Initialization

PG admin: http://localhost:5050
```
PGadmin:
email: admin@gmail.com
password: admin
DB connection:
host: db
port: 5432
user: "admin"
password: "admin"
```
Backend openAPI Swagger: http://localhost:3001/openapi

Backend openAPI Swagger: http://localhost:3001/openapi-json

Backend endpoint: http://localhost:3001

Frontend endpoint: http://localhost:3000

Postman collection: https://crimson-rocket-582729.postman.co/workspace/Devpug~ee2ca793-2e62-42ce-8305-fece0f44c5e8/api/ff997f13-7327-4faf-a1b2-c34066f2487c?action=share&creator=10490686&active-environment=10490686-f5670aec-a033-4555-be1c-364a8753909d

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


Future TODO:
- better authentication (encode password using public/private key)
- establish better accessToken mechanism
- add more test cases for a full testing
