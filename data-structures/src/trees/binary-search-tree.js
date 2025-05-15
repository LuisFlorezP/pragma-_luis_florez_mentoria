/**
 * Implementación de un Árbol Binario de Búsqueda en JavaScript
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * Inserta un valor en el árbol manteniendo la propiedad de BST
     * @param {*} value - Valor a insertar
     */
    insert(value) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        
        let current = this.root;
        while (true) {
            if (value === current.value) return this;  // No permitimos duplicados
            
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }
    
    /**
     * Elimina un valor del árbol
     * @param {*} value - Valor a eliminar
     * @returns {BinarySearchTree} - El árbol modificado
     */
    remove(value) {
        const removeNode = (node, value) => {
            if (node === null) return null;
            
            if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                // Caso 1: Nodo hoja
                if (node.left === null && node.right === null) {
                    return null;
                }
                
                // Caso 2: Nodo con un solo hijo
                if (node.left === null) {
                    return node.right;
                }
                if (node.right === null) {
                    return node.left;
                }
                
                // Caso 3: Nodo con dos hijos
                // Encontrar el sucesor inorder (mínimo del subárbol derecho)
                let successor = node.right;
                while (successor.left !== null) {
                    successor = successor.left;
                }
                
                node.value = successor.value;
                node.right = removeNode(node.right, successor.value);
                return node;
            }
        };
        
        this.root = removeNode(this.root, value);
        return this;
    }
    
    /**
     * Busca un valor en el árbol
     * @param {*} value - Valor a buscar
     * @returns {boolean} - True si el valor existe, false si no
     */
    search(value) {
        if (!this.root) return false;
        
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        return false;
    }
    
    /**
     * Encuentra el valor mínimo en el árbol
     * @returns {*} - Valor mínimo o null si el árbol está vacío
     */
    findMin() {
        if (!this.root) return null;
        
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        
        return current.value;
    }
    
    /**
     * Encuentra el valor máximo en el árbol
     * @returns {*} - Valor máximo o null si el árbol está vacío
     */
    findMax() {
        if (!this.root) return null;
        
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        
        return current.value;
    }
    
    // Alias para compatibilidad con las pruebas
    find(value) {
        return this.search(value);
    }
}

export default BinarySearchTree;