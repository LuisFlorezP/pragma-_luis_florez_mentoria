/**
 * Implementación básica de un Árbol Binario en JavaScript
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    /**
     * Añade un valor al árbol (lo inserta donde encuentre un espacio)
     * @param {*} value - Valor a añadir
     */
    add(value) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }
        
        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            
            if (!current.left) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }
            
            if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }
    
    /**
     * Busca un valor en el árbol
     * @param {*} value - Valor a buscar
     * @returns {boolean} - True si el valor existe, false si no
     */
    find(value) {
        if (!this.root) return false;
        
        // Utilizamos BFS para buscar el valor
        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            
            if (current.value === value) {
                return true;
            }
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        return false;
    }
    
    /**
     * Recorre el árbol en orden (in-order): izquierda, raíz, derecha
     * @param {Function} callback - Función a ejecutar para cada nodo
     */
    inOrder(callback) {
        function traverse(node) {
            if (node) {
                traverse(node.left);
                callback(node.value);
                traverse(node.right);
            }
        }
        
        traverse(this.root);
    }
    
    /**
     * Recorre el árbol en pre-orden: raíz, izquierda, derecha
     * @param {Function} callback - Función a ejecutar para cada nodo
     */
    preOrder(callback) {
        function traverse(node) {
            if (node) {
                callback(node.value);
                traverse(node.left);
                traverse(node.right);
            }
        }
        
        traverse(this.root);
    }
    
    /**
     * Recorre el árbol en post-orden: izquierda, derecha, raíz
     * @param {Function} callback - Función a ejecutar para cada nodo
     */
    postOrder(callback) {
        function traverse(node) {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                callback(node.value);
            }
        }
        
        traverse(this.root);
    }
}

export default BinaryTree;