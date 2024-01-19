# API Vascomm

## Tutorial: Clone, Installation, and Local Run for NodeJS ExpressJS API Vascomm

Welcome to the tutorial for setting up and running a NodeJS ExpressJS API Vascomm locally. This guide will walk you through the process of cloning the repository from GitLab, installing the necessary dependencies, and running the project on your local machine.

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (includes npm)

### Clone the Repository

```bash
git clone https://github.com/fajaramaulana/perpustakaan-expressjs
```

### Instalation

Install the project dependencies using npm:

```bash
npm install
```

This command will download and install all the necessary packages and libraries required for the project.

### Folder Structure

```plaintext
/src
  ├── configs
  │   ├── index.js
  │   ├── sequelize.js
  ├── controllers
  │   ├── authController.js
  │   └── bookController.js
  ├── database
  │   ├── models
  │   │   ├── book.js
  │   │   ├── borrowBook.js
  │   │   ├── index.js
  │   │   ├── permission.js
  │   │   ├── refreshToken.js
  │   │   ├── role.js
  │   │   ├── rolePermission.js
  │   │   ├── user.js
  │   │   └── userRole.js
  │   ├── seeder
  │   │   └── seeder.js
  │   └── databaseSetup.js
  ├── middleware
  │   └── jwtMiddleware.js
  ├── routes
  │   └── api_v1
  │       ├── auth.js
  │       ├── book.js
  │       └── index.js
  ├── services
  │   ├──  authServices.js
  │   └──  bookServices.js
  └── utils
      ├── validation
      │   ├── index.js
      │   ├── validationAuth.js
      │   └── validationBook.js
      ├──  authHelper.js
      ├──  globalHelper.js
      ├──  jwthelper.js
      └──  response.js
/node_modules
.env
.env_example
.eslintrc.json
.gitignore
index.js
package-lock.json
package.json
README.md
```

## /src

### /configs

- **index.js**: Main configuration file.
- **sequelize.js**: Configuration file for Sequelize (assuming it's an ORM for Node.js).

### /controllers

- **authController.js**: Controller for handling authentication-related logic.
- **bookController.js**: Controller for handling book-related logic.

### /database

#### /models

- **book.js**: Model for books.
- **borrowBook.js**: Model for borrowed books.
- **index.js**: Centralized file to import and initialize all models.
- **permission.js**: Model for user permissions.
- **refreshToken.js**: Model for refresh tokens.
- **role.js**: Model for user roles.
- **rolePermission.js**: Model for role permissions.
- **user.js**: Model for users.
- **userRole.js**: Model for user roles.

#### /seeder

- **seeder.js**: Main seeder file.

#### databaseSetup.js

- Database setup file for initializing and configuring the database.

### /middleware

- **jwtMiddleware.js**: Middleware for handling JSON Web Token (JWT) authentication.

### /routes

#### /api_v1

- **auth.js**: API routes related to authentication.
- **book.js**: API routes related to books.
- **index.js**: Centralized file to import and define all API routes.

### /service

- **authServices.js**: Services for handling authentication-related logic.
- **bookServices.js**: Services for handling book-related logic.

### /utils

#### /validation

- **index.js**: Centralized file to import and initialize all validation modules.
- **validationAuth.js**: Validation rules for authentication.
- **validationBook.js**: Validation rules for books.
- **authHelper.js**: Helper functions related to authentication.
- **globalHelper.js**: Global helper functions.
- **jwthelper.js**: Helper functions related to JWT.
- **response.js**: Helper functions for generating standardized API responses.

### /node_modules

- Node.js modules (dependencies) installed for the project.

### .env

- Environment variables configuration file.

### .env_example

- Example of the environment variables configuration file.

### .eslintrc.json

- ESLint configuration file for linting JavaScript code.

### .gitignore

- Gitignore file to specify which files and directories should be ignored by version control.

### index.js

- Entry point file for the application.

### package-lock.json

- Automatically generated file by npm to ensure consistent installs.

### package.json

- File containing metadata and dependencies for the Node.js application.

### README.md

- Documentation file providing an overview of the project.


## Run locally

Start the NodeJS server locally:

```bash
npm start
```

Visit http://localhost:3003 in your web browser to view the application.

### Conclusion

Congratulations! You've successfully cloned the repository, installed dependencies, and run the NodeJS ExpressJS project API Perpustakaan. Feel free to explore and modify the code to suit your needs.

If you encounter any issues or have questions, refer to the project documentation or seek help on the GitLab repository. Happy coding! -FAM
