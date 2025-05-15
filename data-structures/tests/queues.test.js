// Este archivo contiene pruebas unitarias para la implementación de colas.

import Queue from '../src/queues/index.js';

describe('Queue', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    test('should be empty when initialized', () => {
        expect(queue.isEmpty()).toBe(true);
    });

    test('should add an element to the queue', () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.peek()).toBe(1);
    });

    test('should remove an element from the queue', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        const removedElement = queue.dequeue();
        expect(removedElement).toBe(1);
        expect(queue.peek()).toBe(2);
    });

    test('should return undefined when dequeueing from an empty queue', () => {
        const removedElement = queue.dequeue();
        expect(removedElement).toBeUndefined();
    });

    test('should return the front element without removing it', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.peek()).toBe(1);
        expect(queue.isEmpty()).toBe(false);
    });

    test('should maintain the order of elements', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.dequeue()).toBe(2);
        expect(queue.dequeue()).toBe(3);
    });
});