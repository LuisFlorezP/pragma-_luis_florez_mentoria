/**
 * Implementación de una Cola (Queue) en JavaScript
 * Una cola es una estructura de datos FIFO (First In First Out)
 */

class Queue {
    constructor() {
        this.items = [];
    }
    
    /**
     * Añade un elemento al final de la cola
     * @param {*} element - Elemento a añadir
     */
    enqueue(element) {
        this.items.push(element);
    }
    
    /**
     * Elimina y devuelve el elemento del frente de la cola
     * @returns {*} - El elemento del frente o undefined si la cola está vacía
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }
    
    /**
     * Devuelve el elemento del frente sin eliminarlo
     * @returns {*} - El elemento del frente o undefined si la cola está vacía
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }
    
    /**
     * Verifica si la cola está vacía
     * @returns {boolean} - true si la cola está vacía, false en caso contrario
     */
    isEmpty() {
        return this.items.length === 0;
    }
    
    /**
     * Devuelve el número de elementos en la cola
     * @returns {number} - Número de elementos
     */
    size() {
        return this.items.length;
    }
    
    /**
     * Elimina todos los elementos de la cola
     */
    clear() {
        this.items = [];
    }
    
    // Alias para mantener compatibilidad
    front() {
        return this.peek();
    }
}

export default Queue;