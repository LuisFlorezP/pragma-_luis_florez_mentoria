# Patrón GRASP: Fabricación Pura

## Descripción

El patrón Fabricación Pura consiste en crear una clase artificial que no representa un concepto del dominio del problema, pero que ayuda a lograr alta cohesión, bajo acoplamiento y reutilización.

## Principio

Asignar un conjunto cohesivo de responsabilidades a una clase artificial que no representa un concepto del dominio cuando no hay un hogar natural para estas responsabilidades.

## Aplicabilidad

- Utiliza este patrón cuando no existe una clase natural del dominio que pueda asumir ciertas responsabilidades.
- Cuando agrupar ciertas funcionalidades en una clase existente reduciría su cohesión.
- Para mejorar la reutilización de ciertas funcionalidades en diferentes partes del sistema.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `OrderAnalyticsService` es una fabricación pura que proporciona análisis sobre órdenes sin ser parte del modelo de dominio principal.

## Ventajas

- Mejora la cohesión al evitar sobrecargar clases del dominio con responsabilidades no relacionadas.
- Promueve la reutilización de servicios especializados.
- Reduce el acoplamiento entre componentes del dominio.
- Facilita la implementación de funcionalidades transversales.

## Desventajas

- Puede incrementar la complejidad del sistema al añadir más clases.
- Podría dificultar la comprensión del modelo de dominio si se abusa del patrón.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)