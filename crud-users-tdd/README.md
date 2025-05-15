# crud-users-tdd

## Descripción

Este proyecto es una API RESTful sencilla para gestionar usuarios, llamada "crud-users-tdd". Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando NestJS, TypeScript y PostgreSQL como base de datos.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **config/**: Configuraciones de la aplicación.
    - `database.config.ts`: Configuración de la conexión a PostgreSQL.
  - **common/**: Componentes comunes.
    - **middlewares/**: Middlewares para la aplicación.
      - `auth.middleware.ts`: Middleware de autenticación.
  - **users/**: Módulo de usuarios.
    - **controllers/**: Controladores que manejan las solicitudes HTTP.
      - `users.controller.ts`: Controlador para las operaciones relacionadas con usuarios.
    - **services/**: Servicios que contienen la lógica de negocio.
      - `users.service.ts`: Servicio para gestionar usuarios.
    - **models/**: Modelos que definen la estructura de los datos.
      - `user.model.ts`: Modelo de usuario.
    - **entities/**: Entidades para la base de datos.
      - `user.entity.ts`: Entidad de usuario para TypeORM.
    - **dto/**: Objetos de transferencia de datos.
      - `create-user.dto.ts`: DTO para crear usuarios.
      - `update-user.dto.ts`: DTO para actualizar usuarios.
      - `partial-update-user.dto.ts`: DTO para actualizaciones parciales.
  - `app.module.ts`: Módulo principal de la aplicación.
  - `main.ts`: Punto de entrada de la aplicación.

- **test/**: Contiene pruebas para la aplicación.
  - **users/**: Pruebas del módulo de usuarios.
    - `users.controller.spec.ts`: Pruebas unitarias para el UsersController.
    - `users.service.spec.ts`: Pruebas unitarias para el UsersService.
  - `jest-e2e.json`: Configuración para pruebas de extremo a extremo.

- `.env`: Variables de entorno para configuración de la aplicación.
- `package.json`: Configuración de npm y dependencias del proyecto.
- `tsconfig.json`: Configuración de TypeScript.
- `README.md`: Documentación del proyecto.

## Configuración de la base de datos

Este proyecto utiliza PostgreSQL como base de datos. Para configurar la conexión:

1. Crea un archivo `.env` en la raíz del proyecto con la siguiente estructura:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario_postgres
    DB_PASSWORD=tu_password_postgres
    DB_NAME=users_db
    ```

2. Asegúrate de tener PostgreSQL instalado y crea una base de datos llamada `users_db` (o el nombre que hayas especificado en `.env`).

## Cómo ejecutar

1. Instala las dependencias:
    ```sh
    npm install
    ```

2. Configura la base de datos PostgreSQL y el archivo `.env` como se describió anteriormente.

3. Ejecuta el proyecto:
    ```sh
    npm start
    ```

Para modo desarrollo con recarga automática:
```sh
npm run start:dev
```

## Pruebas

Para ejecutar las pruebas unitarias, utiliza:
```
npm run test
```

Para ejecutar las pruebas con observación continua:
```
npm run test:watch
```

Para ejecutar las pruebas de extremo a extremo, utiliza:
```
npm run test:e2e
```

Para ver la cobertura de código:
```
npm run test:cov
```

## API Endpoints

| Método HTTP | URL | Descripción |
|-------------|-----|-------------|
| GET | `/users/` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| POST | `/users/` | Crear nuevo usuario |
| PUT | `/users/:id` | Actualizar completamente un usuario |
| PATCH | `/users/:id` | Actualizar parcialmente un usuario |
| DELETE | `/users/:id` | Eliminar un usuario |

## Documentación API

La API está documentada con Swagger y puede ser explorada en:
`http://localhost:3000/api/documentation`

## Readme Nest

[Readme Nest](./README-Nest.md)

## Volver a la raíz

[Volver a la raíz](../README.md)