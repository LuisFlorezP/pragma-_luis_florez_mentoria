/**
 * Implementación de un Grafo con lista de adyacencia en JavaScript
 */

class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    /**
     * Añade un vértice al grafo
     * @param {string} vertex - Nombre del vértice
     */
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    /**
     * Añade una arista entre dos vértices
     * @param {string} vertex1 - Primer vértice
     * @param {string} vertex2 - Segundo vértice
     */
    addEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            if (!this.adjacencyList[vertex1].includes(vertex2)) {
                this.adjacencyList[vertex1].push(vertex2);
            }
            if (!this.adjacencyList[vertex2].includes(vertex1)) {
                this.adjacencyList[vertex2].push(vertex1);
            }
        }
    }
    
    /**
     * Elimina una arista entre dos vértices
     * @param {string} vertex1 - Primer vértice
     * @param {string} vertex2 - Segundo vértice
     */
    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
        }
    }
    
    /**
     * Elimina un vértice y todas sus aristas
     * @param {string} vertex - Vértice a eliminar
     */
    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) return;
        
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        
        delete this.adjacencyList[vertex];
    }
    
    /**
     * Realiza un recorrido en profundidad (DFS)
     * @param {string} start - Vértice de inicio
     * @param {Function} callback - Función a ejecutar para cada vértice
     */
    depthFirstSearch(start, callback) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        
        (function dfs(vertex) {
            if (!vertex || !adjacencyList[vertex]) return;
            
            visited[vertex] = true;
            result.push(vertex);
            if (callback) callback(vertex);
            
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);
        
        return result;
    }
    
    /**
     * Realiza un recorrido en anchura (BFS)
     * @param {string} start - Vértice de inicio
     * @param {Function} callback - Función a ejecutar para cada vértice
     */
    breadthFirstSearch(start, callback) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[start] = true;
        
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            if (callback) callback(currentVertex);
            
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        
        return result;
    }
}

export default Graph;