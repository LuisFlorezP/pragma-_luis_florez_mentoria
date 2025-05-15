/**
 * Implementación de una Pila (Stack) en JavaScript
 * Una pila es una estructura de datos LIFO (Last In First Out)
 */

class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * Añade un elemento al tope de la pila
     * @param {*} element - Elemento a añadir
     */
    push(element) {
        this.items.push(element);
    }

    /**
     * Elimina y devuelve el elemento del tope de la pila
     * @returns {*} Elemento del tope o undefined si la pila está vacía
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    /**
     * Devuelve el elemento del tope sin eliminarlo
     * @returns {*} Elemento del tope o undefined si la pila está vacía
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Verifica si la pila está vacía
     * @returns {boolean} true si la pila está vacía, false en caso contrario
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Devuelve el número de elementos en la pila
     * @returns {number} Número de elementos
     */
    size() {
        return this.items.length;
    }

    /**
     * Elimina todos los elementos de la pila
     */
    clear() {
        this.items = [];
    }
}

export default Stack;