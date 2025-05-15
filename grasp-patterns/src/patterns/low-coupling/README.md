# Patrón GRASP: Bajo Acoplamiento

## Descripción

El patrón Bajo Acoplamiento busca reducir las dependencias entre diferentes clases de un sistema. Cuando el acoplamiento es bajo, los cambios en una clase tienen menor impacto en otras clases.

## Principio

Asignar responsabilidades para minimizar el acoplamiento entre clases, reduciendo así el impacto de los cambios.

## Aplicabilidad

- Utiliza este patrón cuando quieras crear un sistema donde los componentes sean más independientes.
- Cuando necesites mejorar la reutilización y mantenibilidad del código.
- Para facilitar la evolución del sistema con un mínimo impacto entre componentes.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `NotificationService` tiene bajo acoplamiento con los canales de notificación específicos mediante la inyección de dependencias, permitiendo cambiar el canal sin modificar el servicio.

## Ventajas

- Mejora la mantenibilidad al reducir el impacto de los cambios.
- Aumenta la reutilización de componentes.
- Facilita las pruebas unitarias al permitir el uso de mocks o stubs.
- Contribuye a crear un diseño más modular y flexible.

## Desventajas

- Puede introducir complejidad adicional en forma de interfaces o abstracciones.
- En algunos casos, reducir excesivamente el acoplamiento puede dificultar la comprensión del flujo de la aplicación.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)