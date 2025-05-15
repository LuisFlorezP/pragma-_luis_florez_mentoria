# Patrón GRASP: Creador

## Descripción

El patrón Creador ayuda a determinar qué clase debe ser responsable de crear instancias de otra clase. Establece que una clase B debería ser responsable de crear instancias de la clase A si cumple ciertos criterios.

## Principio

Asignar a la clase B la responsabilidad de crear una instancia de la clase A si:
- B contiene o agrega A
- B registra A
- B usa A de manera cercana
- B tiene los datos de inicialización para A

## Aplicabilidad

- Utiliza este patrón cuando necesites determinar qué clase debe ser responsable de crear instancias de otra clase.
- Cuando quieras mantener un bajo acoplamiento entre las clases.
- Para asegurar que las relaciones entre objetos tengan sentido en el dominio.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `OrderItem` tiene la responsabilidad de crear instancias de `Product`, ya que contiene y utiliza esta información de manera cercana.

## Ventajas

- Favorece el bajo acoplamiento entre clases.
- Soporta el principio de "hablar solo con tus amigos cercanos".
- Hace que las relaciones entre objetos sean más naturales según el dominio.

## Desventajas

- Puede haber situaciones donde no está claro qué clase debe ser la creadora, especialmente cuando múltiples clases cumplen los criterios.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)