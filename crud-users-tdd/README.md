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
    - **logger/**: Configuración centralizada del sistema de logs.
      - `logger.module.ts`: Módulo de configuración de Winston para logs.
    - **interceptors/**: Interceptores globales.
      - `logging.interceptor.ts`: Interceptor para registrar solicitudes HTTP.
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

- **logs/**: Directorio generado automáticamente para almacenar los archivos de logs.
  - `combined.log`: Logs de todos los niveles.
  - `error.log`: Solo logs de errores.

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
    LOG_LEVEL=info
    ```

2. Asegúrate de tener PostgreSQL instalado y crea una base de datos llamada `users_db` (o el nombre que hayas especificado en `.env`).

## Sistema de Logs

El proyecto implementa un sistema de logs robusto utilizando Winston y nest-winston:

- **Niveles de log**: error, warn, info, http, verbose, debug, silly
- **Salidas configuradas**:
  - Consola: Muestra logs formateados para desarrollo
  - Archivo combined.log: Registra todos los mensajes de log
  - Archivo error.log: Solo registra errores

El interceptor de logs registra automáticamente todas las solicitudes HTTP, incluyendo:
- Método y ruta
- Datos de cuerpo, parámetros y consulta
- Tiempo de respuesta
- Errores que ocurran

### Cómo usar los logs en el código

```typescript
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MiServicio {
  private readonly logger = new Logger(MiServicio.name);
  
  miMetodo() {
    this.logger.log('Mensaje de información');
    this.logger.error('Mensaje de error');
    this.logger.warn('Advertencia');
    this.logger.debug('Información de depuración');
    this.logger.verbose('Información detallada');
  }
}
```

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

## Dependencias principales

- **NestJS**: Framework para construir aplicaciones del lado del servidor eficientes y escalables
- **TypeORM**: ORM para TypeScript y JavaScript
- **PostgreSQL**: Sistema de gestión de base de datos
- **Winston**: Logger flexible para múltiples transportes
- **nest-winston**: Integración de Winston con NestJS

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