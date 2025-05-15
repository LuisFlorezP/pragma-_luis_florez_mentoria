/**
 * Implementación de una tabla hash en JavaScript
 */

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    /**
     * Función hash para generar índices
     * @param {string} key - La clave a hashear
     * @returns {number} - El índice calculado
     */
    _hash(key) {
        let hash = 0;
        const PRIME = 31;
        
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const char = key[i];
            const value = char.charCodeAt(0) - 96;
            hash = (hash * PRIME + value) % this.keyMap.length;
        }
        
        return hash;
    }

    /**
     * Establece una nueva entrada clave-valor
     * @param {string} key - La clave
     * @param {*} value - El valor a guardar
     */
    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        
        // Verificar si la clave ya existe para actualizarla
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index][i][1] = value;
                return;
            }
        }
        
        // Si la clave no existe, la añadimos
        this.keyMap[index].push([key, value]);
    }

    /**
     * Obtiene el valor asociado a una clave
     * @param {string} key - La clave a buscar
     * @returns {*} - El valor encontrado o undefined si no existe
     */
    get(key) {
        const index = this._hash(key);
        if (!this.keyMap[index]) return undefined;
        
        for (const item of this.keyMap[index]) {
            if (item[0] === key) {
                return item[1];
            }
        }
        
        return undefined;
    }

    /**
     * Elimina una entrada por su clave
     * @param {string} key - La clave a eliminar
     * @returns {boolean} - true si se eliminó, false si no existía
     */
    remove(key) {
        const index = this._hash(key);
        if (!this.keyMap[index]) return false;
        
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                this.keyMap[index].splice(i, 1);
                return true;
            }
        }
        
        return false;
    }

    /**
     * Devuelve un array con todas las claves
     * @returns {Array} - Array de claves
     */
    keys() {
        const keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (const item of this.keyMap[i]) {
                    keysArr.push(item[0]);
                }
            }
        }
        return keysArr;
    }
    
    /**
     * Devuelve un array con todos los valores
     * @returns {Array} - Array de valores
     */
    values() {
        const valuesArr = [];
        const uniqueValues = new Set();
        
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (const item of this.keyMap[i]) {
                    if (!uniqueValues.has(item[1])) {
                        uniqueValues.add(item[1]);
                        valuesArr.push(item[1]);
                    }
                }
            }
        }
        
        return valuesArr;
    }
}

export default HashTable;