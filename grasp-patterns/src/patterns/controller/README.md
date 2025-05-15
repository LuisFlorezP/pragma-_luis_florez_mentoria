# Patrón GRASP: Controlador

## Descripción

El patrón Controlador asigna la responsabilidad de manejar eventos del sistema a una clase que no forma parte de la interfaz de usuario. Actúa como intermediario entre la interfaz y la lógica de negocio.

## Principio

Asignar la responsabilidad de manejar eventos del sistema a una clase no relacionada con la interfaz de usuario que:
- Representa el sistema global o un caso de uso del sistema.
- Coordina las operaciones pero delega el trabajo real a otros objetos.

## Aplicabilidad

- Utiliza este patrón cuando necesites gestionar eventos del sistema que requieren la coordinación de múltiples objetos.
- Cuando quieras desacoplar la interfaz de usuario de la lógica de negocio.
- Para centralizar el control de un subsistema o caso de uso específico.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `Controller` maneja eventos del sistema coordinando servicios como userService, orderService y paymentService, delegando en ellos la ejecución de las tareas específicas.

## Ventajas

- Promueve la separación de preocupaciones.
- Mejora la mantenibilidad al centralizar la coordinación.
- Facilita la evolución independiente de la interfaz de usuario y la lógica de negocio.
- Mejora la testabilidad al separar capas claramente.

## Desventajas

- Puede convertirse en una "clase Dios" si gestiona demasiadas responsabilidades.
- Puede introducir una capa adicional que complique el diseño para aplicaciones simples.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)