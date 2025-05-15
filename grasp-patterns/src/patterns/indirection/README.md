# Patrón GRASP: Indirección

## Descripción

El patrón Indirección reduce el acoplamiento entre componentes mediante la introducción de un objeto intermediario que media entre ellos.

## Principio

Asignar la responsabilidad a un objeto intermediario para mediar entre otros componentes o servicios, reduciendo así el acoplamiento directo entre ellos.

## Aplicabilidad

- Utiliza este patrón cuando necesites desacoplar componentes que de otro modo estarían fuertemente acoplados.
- Cuando quieras unificar interfaces heterogéneas.
- Para centralizar la comunicación con servicios externos o componentes complejos.

## Ejemplo de Implementación

En nuestro ejemplo, la clase `PaymentGateway` actúa como intermediario entre el código cliente y diferentes servicios de pago como PayPal y Stripe, proporcionando una interfaz unificada.

## Ventajas

- Reduce significativamente el acoplamiento entre componentes.
- Facilita la sustitución o modificación de componentes subyacentes.
- Centraliza la lógica de integración con servicios o componentes externos.
- Proporciona un punto único para implementar aspectos transversales como logging o monitorización.

## Desventajas

- Añade una capa adicional de indirección que puede complicar la comprensión del flujo del programa.
- Puede introducir sobrecarga de rendimiento en algunos casos.

## Volver a Patrones GRASP

[Volver a Patrones GRASP](../../../README.md)