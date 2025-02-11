# C-Fitness Backend

This is the backend for the C-Fitness application, developed with NestJS, using PostgreSQL as the database and JWT for user authentication. It provides a RESTful API documented with Swagger to manage users, workout routines, training logs, and more.

## Technologies Used

- **NestJS:** A Node.js framework for building scalable and efficient applications.
- **PostgreSQL:** A relational database for structured storage.
- **TypeORM:** ORM for interacting with the database.
- **Swagger:** Interactive API documentation.
- **JWT (JSON Web Tokens):** Token-based authentication.
- **Class-validator/Class-transformer:** Data validation and transformation.
- **Bcrypt:** Password encryption.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn (package managers)
- PostgreSQL (local or cloud service like Neon.tech)
- TypeScript (v5.0+)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/tu-usuario/fitness-app-backend.git
    cd fitness-app-backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Set up environment variables (create a `.env` file):

    Create a .env file in the project root and add the following variables:

    ```
    JWT_SECRET=tu_clave_secreta_jwt
    DATABASE_URL=your-postgres-url
    PORT=7000
    ```

4. Development mode

    ```
    npm run start:dev
    ```

5. Start the server:

    ```
    npm run start
    ```


## Project Structure
  ```
  /Fitness-Backend
  ├── src
  │ ├── auth
  │ ├── calendar-data
  │ ├── common
  │ ├── exercise
  │ ├── friends
  │ ├── notification
  │ ├── training-list
  │ ├── user-config
  │ ├── users
  │ ├── websockets
  │ ├── app.module.ts
  │ ├── main.ts
  ├── test
  ├── .env
  ├── package.json
  └── README.md
  ```

## Swagger Documentation

  Access the interactive documentation in your browser:

    http://localhost:7000/docs

  Swagger Features:

  - Test endpoints directly from the browser.
  - Detailed documentation of parameters and responses.
  - Integrated authentication with JWT.
  - Data model schemas.

## PostgreSQL Configuration
  We recommend using Neon.tech for serverless PostgreSQL:

  - Create a free account.
  - Set up a new project.
  - Configure the environment variables with the connection details.

## Contributing
Si deseas contribuir a este proyecto, sigue estos pasos:

1. Fork the repository.

2. Create a new branch:
    ```
    git checkout -b feature/new-feature
    ```
3. Make your changes and commit:
    ```
    git commit -m 'Add new feature'
    ```
4. Push your changes:
    ```
    git push origin feature/new-feature
    ```
5. Abre un pull request.

## License
This project is licensed under the MIT License.