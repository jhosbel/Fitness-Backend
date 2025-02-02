# C-Fitness Backend

Este es el backend de la aplicación C-Fitness desarrollada con NestJS, utilizando MongoDB como base de datos y JWT para la autenticación de usuarios. Proporciona una API RESTful para gestionar usuarios, rutinas de ejercicios, registros de entrenamiento y más.

## Tecnologías utilizadas

- NestJS: Framework de Node.js para construir aplicaciones escalables y eficientes.

- MongoDB: Base de datos NoSQL para almacenar datos de usuarios, rutinas, entrenamientos, etc.

- Mongoose: ODM (Object Data Modeling) para MongoDB, utilizado para interactuar con la base de datos.

- JWT (JSON Web Tokens): Autenticación basada en tokens para asegurar los endpoints.

- Class-validator y Class-transformer: Validación y transformación de datos.

- Bcrypt: Encriptación de contraseñas.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- Node.js (v16 o superior)

- npm o yarn (gestores de paquetes)

- MongoDB (local o en la nube, por ejemplo, MongoDB Atlas)

## Instalación

1. Clona el repositorio:

```
git clone https://github.com/tu-usuario/fitness-app-backend.git
cd fitness-app-backend
```

2. Instala las dependencias:

```
npm install
```

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

```
JWT_SECRET=tu_clave_secreta_jwt
MONGODB_CLUSTER=cluster-de-la-base-de-datos
MONGODB_DATABASE=nombre-de-la-base-de-datos
MONGODB_PASS=contraseña-de-mongodb
MONGODB_USER=usuario-de-mongodb
```

- MONGODB_USER: Nombre del usuario registrado en la URI de conexión a tu base de datos MongoDB.

- MONGODB_CLUSTER: Cluster de la URI de conexión a tu base de datos MongoDB.

- MONGODB_PASS: Contraseña del usuario registrado en la URI de conexión a tu base de datos MongoDB.

- MONGODB_DATABASE: Nombre de la Base de datos en la URI de conexión a tu base de datos MongoDB.

- JWT_SECRET: Clave secreta para firmar los tokens JWT.

4. Ejecuta el servidor:

```
npm run start
```

Para modo de desarrollo (con hot-reload):

```
npm run start:dev
```

## Estructura del proyecto
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
## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.

2. Crea una nueva rama: git checkout -b feature/nueva-funcionalidad.

3. Realiza tus cambios y haz commit: git commit -m 'Añadir nueva funcionalidad'.

4. Sube los cambios: git push origin feature/nueva-funcionalidad.

5. Abre un pull request.
## Licencia
Este proyecto está bajo la licencia MIT.