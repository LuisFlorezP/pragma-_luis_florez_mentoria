// Este archivo contiene pruebas unitarias para la implementación de grafos.

import Graph from '../src/graphs/index.js';

describe('Graph', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph();
    });

    test('should add a vertex', () => {
        graph.addVertex('A');
        expect(graph.adjacencyList['A']).toBeDefined();
        expect(graph.adjacencyList['A']).toEqual([]);
    });

    test('should add an edge', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B');
        expect(graph.adjacencyList['A']).toContain('B');
        expect(graph.adjacencyList['B']).toContain('A');
    });

    test('should remove an edge', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B');
        graph.removeEdge('A', 'B');
        expect(graph.adjacencyList['A']).not.toContain('B');
        expect(graph.adjacencyList['B']).not.toContain('A');
    });

    test('should remove a vertex', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B');
        graph.removeVertex('A');
        expect(graph.adjacencyList['A']).toBeUndefined();
        expect(graph.adjacencyList['B']).not.toContain('A');
    });

    test('should perform depth-first search', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        const result = [];
        graph.depthFirstSearch('A', (vertex) => {
            result.push(vertex);
        });
        expect(result).toEqual(['A', 'B', 'C']);
    });

    test('should perform breadth-first search', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        const result = [];
        graph.breadthFirstSearch('A', (vertex) => {
            result.push(vertex);
        });
        expect(result).toEqual(['A', 'B', 'C']);
    });
});