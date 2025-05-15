# Trees (Árboles)

Los árboles son estructuras de datos jerárquicas no lineales compuestas por nodos conectados mediante enlaces. Cada nodo puede tener varios hijos pero sólo un padre, excepto la raíz que no tiene padre.

## Tipos implementados

- **Binary Tree**: Árbol donde cada nodo tiene como máximo dos hijos.
- **Binary Search Tree**: Árbol binario ordenado donde para cada nodo, todos los valores en el subárbol izquierdo son menores y todos los valores en el subárbol derecho son mayores.

## Operaciones principales

### Binary Tree
- **add**: Añade un nodo al árbol.
- **find**: Busca un valor en el árbol.
- **inOrder**: Recorre el árbol en orden (izquierda, raíz, derecha).
- **preOrder**: Recorre el árbol en pre-orden (raíz, izquierda, derecha).
- **postOrder**: Recorre el árbol en post-orden (izquierda, derecha, raíz).

### Binary Search Tree
- **insert**: Inserta un valor en el árbol manteniendo el orden.
- **remove**: Elimina un valor del árbol.
- **search/find**: Busca un valor en el árbol.
- **findMin/findMax**: Encuentra el valor mínimo/máximo del árbol.

## Casos de uso

- Representación de datos jerárquicos (sistemas de archivos, organización).
- Algoritmos de búsqueda eficientes.
- Indexación en bases de datos.
- Árboles de decisión en inteligencia artificial.
- Compresión de datos (árboles Huffman).
- Expresiones matemáticas.

## Ventajas y desventajas

### Ventajas
- Búsqueda eficiente en árboles balanceados (O(log n)).
- Representación natural de jerarquías.
- Inserciones y eliminaciones relativamente rápidas (O(log n) en árboles balanceados).

### Desventajas
- Implementación más compleja que estructuras lineales.
- Pueden degradarse a listas enlazadas en el peor caso.
- Equilibrar árboles puede ser costoso.

## Volver a las Estructuras de Datos

[Volver a Estructuras de Datos](../../README.md)