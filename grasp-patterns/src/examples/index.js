// Este archivo contiene ejemplos de cómo utilizar los patrones GRASP implementados en el proyecto. 

import { Creator } from '../patterns/creator/creator.js';
import { Expert } from '../patterns/expert/expert.js';
import { LowCoupling } from '../patterns/low-coupling/low-coupling.js';
import { HighCohesion } from '../patterns/high-cohesion/high-cohesion.js';
import { Controller } from '../patterns/controller/controller.js';
import { Polymorphism } from '../patterns/polymorphism/polymorphism.js';
import { PureFabrication } from '../patterns/pure-fabrication/pure-fabrication.js';
import { Indirection } from '../patterns/indirection/indirection.js';
import { ProtectedVariations } from '../patterns/protected-variations/protected-variations.js';

// Ejemplo de uso del patrón Creador
const creator = new Creator();
const product = creator.createProduct();
console.log('Producto creado:', product);

// Ejemplo de uso del patrón Experto
const expert = new Expert();
expert.performAction();

// Ejemplo de uso del patrón Bajo Acoplamiento
const lowCoupling = new LowCoupling();
lowCoupling.establishRelationships();

// Ejemplo de uso del patrón Alta Cohesion
const highCohesion = new HighCohesion();
highCohesion.operateOnData();

// Ejemplo de uso del patrón Controlador
const controller = new Controller();
controller.handleEvent();

// Ejemplo de uso del patrón Polimorfismo
const polymorphism = new Polymorphism();
polymorphism.demonstrateUsage();

// Ejemplo de uso del patrón Fabricacion Pura
const pureFabrication = new PureFabrication();
const pureInstance = pureFabrication.createInstance();
console.log('Instancia creada de manera pura:', pureInstance);

// Ejemplo de uso del patrón Indirection
const indirection = new Indirection();
indirection.handleCommunication();

// Ejemplo de uso del patrón Proteccion Variaciones
const protectedVariations = new ProtectedVariations();
protectedVariations.implementStrategy();