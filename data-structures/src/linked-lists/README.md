# Linked Lists (Listas Enlazadas)

Una lista enlazada es una estructura de datos lineal donde cada elemento (nodo) contiene un valor y una referencia al siguiente nodo. A diferencia de los arrays, los elementos no se almacenan en posiciones contiguas de memoria.

## Operaciones principales

- **add**: Añade un elemento al final de la lista.
- **addFirst**: Añade un elemento al principio de la lista.
- **remove**: Elimina un elemento con un valor específico.
- **contains**: Verifica si un valor existe en la lista.
- **find**: Encuentra y devuelve un nodo con un valor específico.
- **size**: Devuelve el número de elementos en la lista.
- **toArray**: Convierte la lista a un array.

## Casos de uso

- Implementación de pilas y colas.
- Historial de navegación.
- Gestión de memoria en sistemas operativos.
- Representación de grafos (listas de adyacencia).
- Implementación de otras estructuras de datos como tablas hash.

## Ventajas y desventajas

### Ventajas
- Inserción y eliminación eficientes (O(1) si se conoce la posición).
- Tamaño dinámico.
- No requiere realojamiento como los arrays.

### Desventajas
- Acceso más lento a elementos arbitrarios (O(n)).
- Mayor uso de memoria por los punteros adicionales.
- No hay acceso directo a los elementos por índice.

## Volver a las Estructuras de Datos

[Volver a Estructuras de Datos](../../README.md)