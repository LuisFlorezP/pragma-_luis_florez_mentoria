# Patrón GRASP: Alta Cohesión

## Descripción

El patrón Alta Cohesión busca mantener las responsabilidades de una clase fuertemente relacionadas y enfocadas. Una clase con alta cohesión tiene un propósito bien definido y sus elementos trabajan juntos para lograr objetivos específicos.

## Principio

Asignar responsabilidades de manera que la cohesión permanezca alta, es decir, que cada clase se enfoque en hacer una cosa bien.

## Aplicabilidad

- Utiliza este patrón cuando diseñes clases para mantener su enfoque y propósito claros.
- Cuando quieras evitar clases que realicen funciones no relacionadas entre sí.
- Para mejorar la mantenibilidad y reutilización del código.

## Ejemplo de Implementación

En nuestro ejemplo, las clases `AuthenticationService` y `UserProfileService` tienen alta cohesión porque cada una se ocupa de un conjunto específico de responsabilidades relacionadas (autenticación y gestión de perfiles, respectivamente).

## Ventajas

- Mejora la claridad y facilita la comprensión del código.
- Simplifica el mantenimiento y las modificaciones.
- Favorece la reutilización de componentes.
- Aumenta la robustez del diseño.

## Desventajas

- Puede llevar a la creación de muchas clases pequeñas, lo que podría complicar la navegación por el código.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)