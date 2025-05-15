// Este archivo contiene pruebas unitarias para la implementación de pilas.

import Stack from '../src/stacks/index.js';

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    test('should start empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    test('should push items onto the stack', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
        expect(stack.size()).toBe(2);
    });

    test('should pop items off the stack', () => {
        stack.push(1);
        stack.push(2);
        const poppedItem = stack.pop();
        expect(poppedItem).toBe(2);
        expect(stack.size()).toBe(1);
    });

    test('should return the top item without removing it', () => {
        stack.push(1);
        expect(stack.peek()).toBe(1);
        expect(stack.size()).toBe(1);
    });

    test('should return undefined when popping from an empty stack', () => {
        const poppedItem = stack.pop();
        expect(poppedItem).toBeUndefined();
    });

    test('should return undefined when peeking at an empty stack', () => {
        const topItem = stack.peek();
        expect(topItem).toBeUndefined();
    });
});