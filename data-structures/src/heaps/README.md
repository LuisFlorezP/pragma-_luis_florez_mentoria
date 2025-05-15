# Heaps (Montículos)

Un montículo es una estructura de datos basada en un árbol binario completo que cumple la propiedad de montículo: para un MinHeap, cada nodo padre tiene un valor menor o igual que sus hijos; para un MaxHeap, cada nodo padre tiene un valor mayor o igual que sus hijos.

## Operaciones principales

- **insert**: Inserta un elemento en el montículo.
- **remove**: Elimina y devuelve el elemento mínimo/máximo.
- **peek**: Devuelve el elemento mínimo/máximo sin eliminarlo.
- **bubbleUp**: Reordena el montículo hacia arriba tras una inserción.
- **sinkDown**: Reordena el montículo hacia abajo tras una eliminación.

## Casos de uso

- Algoritmos de planificación.
- Algoritmo de Dijkstra para caminos más cortos.
- Colas de prioridad.
- Ordenamiento HeapSort.
- Algoritmos de selección de orden k.
- Problemas de mediana en flujos de datos.

## Ventajas y desventajas

### Ventajas
- Acceso eficiente (O(1)) al elemento mínimo/máximo.
- Inserción y eliminación en tiempo logarítmico O(log n).
- Implementación eficiente en arrays.
- Base para algoritmos eficientes como HeapSort.

### Desventajas
- No permite búsqueda eficiente de elementos arbitrarios.
- No mantiene orden total entre elementos.
- Operaciones como "contiene" o "eliminar elemento específico" son costosas (O(n)).

## Volver a las Estructuras de Datos

[Volver a Estructuras de Datos](../../README.md)