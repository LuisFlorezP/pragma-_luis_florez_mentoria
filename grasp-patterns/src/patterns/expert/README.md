# Patrón GRASP: Experto en Información

## Descripción

El patrón Experto en Información asigna responsabilidades a la clase que tiene la información necesaria para realizar una tarea. Es uno de los patrones GRASP más fundamentales.

## Principio

Asignar una responsabilidad a la clase que tiene la información necesaria para cumplirla.

## Aplicabilidad

- Utiliza este patrón cuando necesites determinar qué clase debe ser responsable de una determinada funcionalidad.
- Cuando quieras diseñar clases que encapsulen tanto datos como comportamientos relacionados con esos datos.
- Para mantener la encapsulación alta y el acoplamiento bajo, haciendo que las clases usen su propia información para realizar sus tareas.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `Order` es experta en calcular su total y determinar su estado de envío, ya que posee toda la información necesaria para estas operaciones.

## Ventajas

- Mantiene la encapsulación, ya que los objetos utilizan su propia información.
- Distribuye el comportamiento entre las clases que contienen la información necesaria.
- Reduce el acoplamiento, ya que evita dependencias innecesarias.
- Aumenta la cohesión, manteniendo la funcionalidad relacionada junta.

## Desventajas

- En algunos casos, puede llevar a clases sobrecargadas si tienen demasiada información y por lo tanto demasiadas responsabilidades.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)