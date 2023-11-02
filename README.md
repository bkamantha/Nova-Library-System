
# Nova Library System

This project is a library management system implemented in Node.js.

## Project Structure
The Nova-Library-System folder structure is a typical Node.js project structure. It contains the following folders and files:

```text
Nova-Library-System
│   .gitignore
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
└───src
    │   app.js
    │   config.js
    │   server.js
    │
    ├───components
    │   │   main.routes.js
    │   │
    │   ├───auth
    │   ├───book
    │   ├───borrowings
    │   └───user
    ├───config
    ├───middleware
    │       authMiddleware.js
    │       error-handling-middleware.js
    │       validateMiddleware.js
    └───test

```

### Usage
This project is a library management system named “nova-library-system”. It’s the backend for a Nova Solutions assignment.

Postman document URL ->
https://documenter.getpostman.com/view/15805350/2s9YXceQxG 

render.com webservice backend URL ->
https://nova-libman-service.onrender.com

### Installation
Before you can run this project, you need to make sure that Node.js is installed on your machine. Then, you can clone this repository and install its dependencies.

```bash
git clone https://github.com/yourusername/nova-library-system.git
cd nova-library-system
npm install
```

Replace https://github.com/yourusername/nova-library-system.git with the actual URL of this repository.

### Running the Project
This project includes several scripts for running the project and its tests:

- `start:dev`: This script runs the project in development mode. It uses nodemon to automatically restart the server whenever changes are made. You can run it with the command npm run start:dev.
- `start`: This script runs the project in production mode. You can run it with the command npm start.
- `test`: This script runs the project’s tests using Jest. You can run it with the command npm test.

### Environment Variables
This project uses environment variables for configuration. These variables should be placed in a .env file in the root directory of the project. An example `.env` file might look like this:

# replace these values with your actual configuration details

```text
PORT = 8000

DB_HOST=mongo
MONGO_DB_URL = "URL

SECRET_KEY = "KEY"

```

### Top Level

- `.env`: This file contains environment variables.
- `.gitignore`: This file contains a list of file patterns that git should ignore.
- `LICENSE`: This file contains the license details for the project.
- `package-lock.json` and `package.json`: These files contain information about the project's dependencies.
- `README.md`: This is the file you are reading now! It's a markdown file that contains information about the project.

### src Directory

This directory contains the main source code for the project.

- `app.js`: This is the main application file.
- `config.js`: This file contains configuration details for the application.
- `server.js`: This file sets up and starts the server.

### src/components Directory

This directory contains the main components of the application, including routes and controllers for authentication (`auth`), books (`book`), borrowings (`borrowings`), and users (`user`).

### src/middleware Directory

This directory contains middleware functions for authentication, error handling, and request validation.

### src/test

This directory contains test functions using testing framework.
