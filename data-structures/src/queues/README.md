# Queues (Colas)

Una cola es una estructura de datos lineal que sigue el principio FIFO (First In First Out). Los elementos se insertan por un extremo (final) y se eliminan por el otro (frente).

## Operaciones principales

- **enqueue**: Añade un elemento al final de la cola.
- **dequeue**: Elimina y devuelve el elemento del frente de la cola.
- **peek/front**: Devuelve el elemento del frente sin eliminarlo.
- **isEmpty**: Verifica si la cola está vacía.
- **size**: Devuelve el número de elementos en la cola.
- **clear**: Elimina todos los elementos de la cola.

## Casos de uso

- Gestión de tareas en sistemas operativos.
- Procesamiento de peticiones en servidores web.
- Algoritmos de búsqueda en anchura (BFS).
- Buffers para datos entre dos procesos.
- Gestión de impresión.
- Simulación de eventos.

## Ventajas y desventajas

### Ventajas
- Garantiza orden de procesamiento.
- Operaciones principales en tiempo constante O(1).

### Desventajas
- Acceso limitado (solo a los extremos).
- No permite acceso aleatorio sin destruir la estructura.

## Volver a las Estructuras de Datos

[Volver a Estructuras de Datos](../../README.md)