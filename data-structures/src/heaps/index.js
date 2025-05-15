/**
 * Implementación de un MinHeap en JavaScript
 * Un MinHeap es un árbol binario donde cada nodo es menor que sus hijos
 */

class Heap {
    constructor() {
        this.values = [];
    }
    
    /**
     * Devuelve el índice del padre de un nodo
     * @param {number} idx - Índice del nodo
     * @returns {number} - Índice del padre
     */
    getParentIndex(idx) {
        return Math.floor((idx - 1) / 2);
    }
    
    /**
     * Devuelve el índice del hijo izquierdo de un nodo
     * @param {number} idx - Índice del nodo
     * @returns {number} - Índice del hijo izquierdo
     */
    getLeftChildIndex(idx) {
        return 2 * idx + 1;
    }
    
    /**
     * Devuelve el índice del hijo derecho de un nodo
     * @param {number} idx - Índice del nodo
     * @returns {number} - Índice del hijo derecho
     */
    getRightChildIndex(idx) {
        return 2 * idx + 2;
    }
    
    /**
     * Intercambia dos elementos del heap
     * @param {number} idx1 - Índice del primer elemento
     * @param {number} idx2 - Índice del segundo elemento
     */
    swap(idx1, idx2) {
        [this.values[idx1], this.values[idx2]] = [this.values[idx2], this.values[idx1]];
    }
    
    /**
     * Inserta un nuevo elemento en el heap
     * @param {number} value - Valor a insertar
     */
    insert(value) {
        this.values.push(value);
        this.bubbleUp();
    }
    
    /**
     * Reordena el heap hacia arriba después de una inserción
     */
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        
        while (idx > 0) {
            const parentIdx = this.getParentIndex(idx);
            const parent = this.values[parentIdx];
            
            if (element >= parent) break;
            
            this.swap(idx, parentIdx);
            idx = parentIdx;
        }
    }
    
    /**
     * Elimina y devuelve el elemento mínimo del heap
     * @returns {number|null} - El elemento mínimo o null si el heap está vacío
     */
    remove() {
        if (this.values.length === 0) return null;
        
        const min = this.values[0];
        const end = this.values.pop();
        
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        
        return min;
    }
    
    /**
     * Reordena el heap hacia abajo después de una eliminación
     */
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        
        while (true) {
            const leftChildIdx = this.getLeftChildIndex(idx);
            const rightChildIdx = this.getRightChildIndex(idx);
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild < element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild < element) || 
                    (swap !== null && rightChild < leftChild)
                ) {
                    swap = rightChildIdx;
                }
            }
            
            if (swap === null) break;
            
            this.swap(idx, swap);
            idx = swap;
        }
    }
    
    /**
     * Devuelve el elemento mínimo sin eliminarlo
     * @returns {number|null} - El elemento mínimo o null si el heap está vacío
     */
    peek() {
        return this.values.length > 0 ? this.values[0] : null;
    }
}

export default Heap;