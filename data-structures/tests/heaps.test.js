import Heap from '../src/heaps/index.js';

describe('Heap', () => {
    let heap;

    beforeEach(() => {
        heap = new Heap();
    });

    test('should insert elements into the heap', () => {
        heap.insert(10);
        heap.insert(5);
        heap.insert(15);
        expect(heap.peek()).toBe(5);
    });

    test('should remove the minimum element from the heap', () => {
        heap.insert(10);
        heap.insert(5);
        heap.insert(15);
        const removed = heap.remove();
        expect(removed).toBe(5);
        expect(heap.peek()).toBe(10);
    });

    test('should maintain the heap property after insertions', () => {
        heap.insert(20);
        heap.insert(15);
        heap.insert(30);
        heap.insert(10);
        expect(heap.peek()).toBe(10);
    });

    test('should maintain the heap property after removals', () => {
        heap.insert(20);
        heap.insert(15);
        heap.insert(30);
        heap.insert(10);
        heap.remove();
        expect(heap.peek()).toBe(15);
    });

    test('should return null when removing from an empty heap', () => {
        expect(heap.remove()).toBeNull();
    });
});