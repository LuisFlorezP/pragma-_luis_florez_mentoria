# Singleton Pattern Example

Este proyecto es un ejemplo del patrón de diseño Singleton en TypeScript.

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

El patrón Singleton garantiza que una clase tenga solo una instancia y proporciona un punto de acceso global a ella. En este ejemplo, la clase `Singleton` mantiene una única instancia y permite agregar y obtener datos de una lista compartida.

## Aplicabilidad

- Utiliza el patrón Singleton cuando una clase de tu programa deba tener una única instancia accesible para todos los clientes; por ejemplo, un único objeto de base de datos compartido por diferentes partes del programa.
- Utiliza el patrón Singleton cuando necesites un control más estricto sobre las variables globales.

## Implementación

1. Añade un campo estático privado a la clase para almacenar la instancia Singleton.
2. Declara un método de creación estático público para obtener la instancia Singleton.
3. Implementa una inicialización diferida dentro del método estático. Debe crear un nuevo objeto en su primera llamada y guardarlo en el campo estático. El método deberá devolver siempre esa instancia en todas las llamadas siguientes.
4. Declara el constructor de la clase como privado. El método estático de la clase seguirá siendo capaz de invocar al constructor, pero no otros objetos.
5. Revisa el código cliente y reemplaza todas las llamadas directas al constructor de la instancia Singleton por llamadas a su método de creación estático.

## Pros y contras

### Pros
- Garantiza que una clase tenga una única instancia.
- Proporciona un punto de acceso global a dicha instancia.
- La instancia Singleton solo se inicializa cuando se necesita por primera vez.

### Contras
- Viola el Principio de responsabilidad única, ya que el patrón resuelve dos problemas a la vez.
- Puede ocultar un mal diseño, por ejemplo, cuando los componentes del programa están demasiado acoplados.
- Requiere un manejo especial en entornos multihilo para evitar que varios hilos creen múltiples instancias del Singleton.
- Puede ser difícil realizar pruebas unitarias del código cliente del Singleton porque muchos frameworks de prueba dependen de la herencia para crear objetos simulados (mock objects). Dado que la clase Singleton es privada y en la mayoría de los lenguajes es imposible sobrescribir métodos estáticos, tendrás que encontrar una manera creativa de simular el Singleton. O simplemente no escribas las pruebas. O no utilices el patrón Singleton.

## Volver a los Patrones Creacionales

[Volver a Patrones Creacionales](../README.md)