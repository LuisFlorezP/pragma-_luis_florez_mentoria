# Patrones GRASP

Este directorio contiene implementaciones de los patrones GRASP (General Responsibility Assignment Software Patterns) en JavaScript. Los patrones GRASP son un conjunto de principios para asignar responsabilidades a clases y objetos en diseño orientado a objetos, desarrollados por Craig Larman.

## Estructura del directorio

- **[expert/](src/patterns/expert/README.md)**: Implementación del patrón Experto en Información.
- **[creator/](src/patterns/creator/README.md)**: Implementación del patrón Creador.
- **[controller/](src/patterns/controller/README.md)**: Implementación del patrón Controlador.
- **[high-cohesion/](src/patterns/high-cohesion/README.md)**: Implementación del patrón Alta Cohesión.
- **[low-coupling/](src/patterns/low-coupling/README.md)**: Implementación del patrón Bajo Acoplamiento.
- **[polymorphism/](src/patterns/polymorphism/README.md)**: Implementación del patrón Polimorfismo.
- **[pure-fabrication/](src/patterns/pure-fabrication/README.md)**: Implementación del patrón Fabricación Pura.
- **[indirection/](src/patterns/indirection/README.md)**: Implementación del patrón Indirección.
- **[protected-variations/](src/patterns/protected-variations/README.md)**: Implementación del patrón Protección frente a Variaciones.

## Patrones GRASP

### Patrones Básicos de Asignación de Responsabilidades
Estos patrones proporcionan principios fundamentales para asignar responsabilidades a clases:

- **Experto en Información**: Asigna una responsabilidad a la clase que tiene la información necesaria para cumplirla.
- **Creador**: Asigna la responsabilidad de crear una instancia a la clase que contiene o agrega esa instancia.
- **Controlador**: Asigna la responsabilidad de manejar eventos del sistema a clases no relacionadas con la interfaz de usuario.

### Patrones de Acoplamiento y Cohesión
Estos patrones se centran en mejorar las características estructurales del diseño:

- **Alta Cohesión**: Asigna responsabilidades de manera que la cohesión permanezca alta (cada clase se enfoca en una sola cosa).
- **Bajo Acoplamiento**: Asigna responsabilidades para minimizar el acoplamiento entre clases.

### Patrones de Flexibilidad y Extensibilidad
Estos patrones ayudan a crear diseños que sean adaptables y fáciles de extender:

- **Polimorfismo**: Asigna comportamientos dependientes del tipo a clases que tienen esos tipos.
- **Fabricación Pura**: Crea una clase artificial cuando no hay una clase natural para asignar una responsabilidad.
- **Indirección**: Reduce el acoplamiento asignando responsabilidades a un objeto intermediario.
- **Protección frente a Variaciones**: Diseña interfaces estables alrededor de puntos de variación probable.

## Cómo usar

Cada patrón está implementado en su propio archivo dentro de las subcarpetas correspondientes. Puedes explorar cada uno para entender cómo se implementa y cómo puede ser utilizado en tus propios proyectos.

## Volver a la raíz

[Volver a la raíz](../README.md)