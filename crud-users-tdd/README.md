# crud-users-tdd

## Descripción

Este proyecto es una API RESTful sencilla para gestionar usuarios, llamada "crud-users-tdd". Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando NestJS y TypeScript.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **controllers/**: Controladores que manejan las solicitudes HTTP.
    - `user.controller.ts`: Controlador para las operaciones relacionadas con usuarios.
  - **services/**: Servicios que contienen la lógica de negocio.
    - `user.service.ts`: Servicio para gestionar usuarios.
  - **models/**: Modelos que definen la estructura de los datos.
    - `user.model.ts`: Modelo de usuario.
  - **dtos/**: Objetos de transferencia de datos.
    - `user.dto.ts`: DTO para usuarios.
  - `app.module.ts`: Módulo principal de la aplicación.
  - `main.ts`: Punto de entrada de la aplicación.
  - **types/**: Tipos e interfaces utilizados en la aplicación.
    - `index.ts`: Interfaces como UserResponse y UserRequest.

- **test/**: Contiene pruebas para la aplicación.
  - `user.controller.spec.ts`: Pruebas unitarias para el UserController.
  - `user.service.spec.ts`: Pruebas unitarias para el UserService.
  - `jest-e2e.json`: Configuración para pruebas de extremo a extremo.

- `package.json`: Configuración de npm y dependencias del proyecto.
- `tsconfig.json`: Configuración de TypeScript.
- `README.md`: Documentación del proyecto.

## Cómo ejecutar

1. Instala las dependencias:
    ```sh
    npm install
    ```

2. Ejecuta el proyecto:
    ```sh
    npm start
    ```

## Pruebas

Para ejecutar las pruebas unitarias, utiliza:
```
npm run test
```

Para ejecutar las pruebas de extremo a extremo, utiliza:
```
npm run test:e2e
```

## Readme Nest

[Readme Nest](./README-Nest.md)

## Volver a la raíz

[Volver a la raíz](../README.md)