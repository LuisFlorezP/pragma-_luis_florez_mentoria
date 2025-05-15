/**
 * Implementación de una Lista Enlazada en JavaScript
 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    /**
     * Añade un elemento al final de la lista
     * @param {*} value - Valor a añadir
     */
    add(value) {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        this._size++;
        return this;
    }

    /**
     * Añade un elemento al principio de la lista
     * @param {*} value - Valor a añadir
     */
    addFirst(value) {
        const newNode = new Node(value);
        
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        
        this._size++;
        return this;
    }

    /**
     * Elimina el primer elemento con el valor dado
     * @param {*} value - Valor a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     */
    remove(value) {
        if (!this.head) return false;
        
        if (this.head.value === value) {
            this.head = this.head.next;
            this._size--;
            
            if (!this.head) {
                this.tail = null;
            }
            
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        
        if (current.next) {
            if (current.next === this.tail) {
                this.tail = current;
            }
            
            current.next = current.next.next;
            this._size--;
            return true;
        }
        
        return false;
    }

    /**
     * Busca un elemento en la lista
     * @param {*} value - Valor a buscar
     * @returns {boolean} true si se encuentra, false en caso contrario
     */
    contains(value) {
        let current = this.head;
        
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        
        return false;
    }

    /**
     * Devuelve el número de elementos en la lista
     * @returns {number} Número de elementos
     */
    size() {
        return this._size;
    }

    /**
     * Convierte la lista a un array
     * @returns {Array} Array con los elementos de la lista
     */
    toArray() {
        const result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        
        return result;
    }
    
    /**
     * Busca y devuelve el nodo con el valor especificado
     * @param {*} value - Valor a buscar
     * @returns {Node|null} - El nodo encontrado o null si no existe
     */
    find(value) {
        let current = this.head;
        
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        
        return null;
    }
}

export default LinkedList;