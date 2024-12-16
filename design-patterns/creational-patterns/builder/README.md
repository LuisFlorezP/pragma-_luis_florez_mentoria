# Builder Pattern Example

Este proyecto es un ejemplo del patrón de diseño Builder en TypeScript.

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

El patrón Builder permite la creación de objetos complejos de manera incremental. Es útil cuando la construcción de un objeto implica varios pasos. Este patrón separa el proceso de construcción de la representación del objeto, permitiendo crear diferentes representaciones utilizando el mismo proceso de construcción.

## Aplicabilidad

- Utiliza el patrón Builder para evitar constructores con múltiples parámetros opcionales. En lugar de tener múltiples constructores con diferentes combinaciones de parámetros, el patrón Builder permite construir objetos paso a paso utilizando solo los pasos necesarios.
- Utiliza el patrón Builder cuando necesites que el código sea capaz de crear diferentes representaciones de un producto (por ejemplo, casas de piedra y casas de madera). La interfaz del constructor base define todos los pasos de construcción posibles, mientras que los constructores concretos implementan estos pasos para crear representaciones específicas del producto.
- Utiliza el patrón Builder para construir estructuras complejas como árboles de objetos. El patrón Builder permite construir productos de manera incremental y posponer la ejecución de ciertos pasos sin descomponer el producto final.

## Implementación

1. Define claramente los pasos comunes de construcción para todas las representaciones del producto.
2. Declara estos pasos en la interfaz del constructor base.
3. Crea una clase constructora concreta para cada una de las representaciones del producto e implementa sus pasos de construcción.
4. Implementa un método para obtener el resultado de la construcción. Este método no se puede declarar en la interfaz del constructor si los productos no comparten una interfaz común.
5. Considera crear una clase directora que encapsule varias formas de construir un producto utilizando el mismo objeto constructor.
6. El código cliente crea tanto el objeto constructor como el director. Antes de iniciar la construcción, el cliente debe pasar un objeto constructor al director. El director utiliza el objeto constructor para el resto del proceso de construcción.

## Pros y contras

### Pros
- Permite construir objetos de manera incremental, posponer pasos de la construcción o ejecutar pasos de forma recursiva.
- Facilita la reutilización del mismo código de construcción para crear diferentes representaciones de productos.
- Principio de responsabilidad única: aísla el código de construcción complejo de la lógica de negocio del producto.

### Contras
- Aumenta la complejidad general del código, ya que el patrón requiere la creación de varias clases adicionales.

## Volver a los Patrones Creacionales

[Volver a Patrones Creacionales](../README.md)