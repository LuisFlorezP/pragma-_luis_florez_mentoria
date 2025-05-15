# Patrón GRASP: Polimorfismo

## Descripción

El patrón Polimorfismo asigna responsabilidades dependientes del tipo a clases que implementan un comportamiento común a través de una interfaz o clase base, evitando condicionales explícitos.

## Principio

Asignar comportamientos que varían según el tipo a diferentes clases que implementan una interfaz común, en lugar de usar lógica condicional.

## Aplicabilidad

- Utiliza este patrón cuando tengas comportamientos que varían según el tipo de objeto.
- Cuando quieras eliminar condicionales complejos que dependen del tipo.
- Para extender fácilmente el sistema con nuevos tipos sin modificar el código existente.

## Ejemplo de Implementación

En nuestro ejemplo, diferentes calculadoras de impuestos implementan la misma interfaz `TaxCalculator`, permitiendo calcular impuestos de manera uniforme sin necesidad de condicionales.

## Ventajas

- Elimina condicionales basados en tipo, haciendo el código más limpio.
- Facilita la extensibilidad al permitir añadir nuevos tipos sin modificar el código cliente.
- Mejora la cohesión al asignar comportamientos específicos a las clases apropiadas.
- Promueve el principio Open/Closed de SOLID.

## Desventajas

- Puede aumentar la complejidad del diseño al requerir jerarquías de clases.
- En casos muy simples, podría ser más complejo que una implementación condicional directa.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)