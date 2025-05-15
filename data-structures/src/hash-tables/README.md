# Hash Tables (Tablas Hash)

Las tablas hash son estructuras de datos que almacenan pares clave-valor y permiten un acceso rápido a los valores mediante una función hash que transforma la clave en un índice.

## Operaciones principales

- **set**: Asigna un valor a una clave.
- **get**: Obtiene el valor asociado a una clave.
- **remove**: Elimina una entrada por su clave.
- **keys**: Devuelve un array con todas las claves.
- **values**: Devuelve un array con todos los valores (sin duplicados).

## Casos de uso

- Implementación de diccionarios y mapas.
- Cachés de datos.
- Conjuntos de datos únicos.
- Índices de bases de datos.
- Tablas de símbolos en compiladores.
- Detección de duplicados.

## Ventajas y desventajas

### Ventajas
- Tiempo de búsqueda, inserción y eliminación promedio de O(1).
- Implementación eficiente de diccionarios y conjuntos.
- No requiere que las claves sean comparables, solo hashables.

### Desventajas
- Posibles colisiones que pueden degradar el rendimiento.
- Espacio adicional para la tabla hash.
- El rendimiento depende de una buena función hash y política de resolución de colisiones.
- No mantiene un orden entre los elementos.

## Volver a las Estructuras de Datos

[Volver a Estructuras de Datos](../../README.md)