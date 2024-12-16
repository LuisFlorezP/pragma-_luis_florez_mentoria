# Factory Method Pattern Example

Este proyecto es un ejemplo del patrón de diseño Factory Method en TypeScript.

## Cómo ejecutar

1. Instala las dependencias:
    ```sh
    npm install
    ```

2. Compila el proyecto:
    ```sh
    npm run build
    ```

3. Ejecuta el proyecto:
    ```sh
    npm start
    ```

## Descripción

El patrón Factory Method define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase instanciar. Permite a una clase delegar la responsabilidad de creación a las subclases.

## Aplicabilidad

- Utiliza el patrón Factory Method cuando una clase no puede anticipar el tipo de objetos que debe crear.
- Utiliza el patrón Factory Method cuando una clase quiere que sus subclases especifiquen los objetos que crea.
- Utiliza el patrón Factory Method cuando las clases delegan la responsabilidad de creación a una de varias subclases auxiliares, y planeas localizar la información sobre qué subclase es la delegada.

## Implementación

1. Declara una interfaz `Vehicle` que defina la operación que todos los vehículos deben implementar.
2. Crea clases concretas que implementen la interfaz `Vehicle`.
3. Declara una clase `VehicleFactory` con un método abstracto `createVehicle` que devuelva un objeto `Vehicle`.
4. Crea clases concretas que extiendan `VehicleFactory` e implementen el método `createVehicle` para devolver instancias de vehículos concretos.
5. Utiliza el método `createVehicle` en el código cliente para crear vehículos sin acoplarse a clases concretas.

## Pros y contras

### Pros
- Evita el acoplamiento entre el código cliente y las clases concretas.
- Permite añadir nuevas clases de productos sin modificar el código cliente.
- Promueve el uso de interfaces y clases abstractas.

### Contras
- Puede introducir una complejidad adicional en el código debido a la necesidad de crear múltiples subclases.

## Volver a los Patrones Creacionales

[Volver a Patrones Creacionales](../README.md)