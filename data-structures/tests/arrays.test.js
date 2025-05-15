// Este archivo contiene pruebas unitarias para funciones de arrays.

import { findElement, filterArray, mapArray, reduceArray, removeDuplicates } from '../src/arrays/index.js';

describe('Array Functions', () => {
    const array = [1, 2, 3, 4];

    test('findElement should return the index of an element', () => {
        const index = findElement(array, 3);
        expect(index).toBe(2);
    });

    test('findElement should return -1 if the element is not found', () => {
        const index = findElement(array, 5);
        expect(index).toBe(-1);
    });

    test('filterArray should filter elements based on a condition', () => {
        const filtered = filterArray(array, n => n > 2);
        expect(filtered).toEqual([3, 4]);
    });

    test('mapArray should transform elements', () => {
        const doubled = mapArray(array, n => n * 2);
        expect(doubled).toEqual([2, 4, 6, 8]);
    });

    test('reduceArray should reduce array to a single value', () => {
        const sum = reduceArray(array, (acc, n) => acc + n, 0);
        expect(sum).toBe(10);
    });

    test('removeDuplicates should remove duplicate elements', () => {
        const withDuplicates = [1, 2, 2, 3, 4, 4];
        const unique = removeDuplicates(withDuplicates);
        expect(unique).toEqual([1, 2, 3, 4]);
    });
});