import HashTable from '../src/hash-tables/index.js';

describe('HashTable', () => {
    let hashTable;

    beforeEach(() => {
        hashTable = new HashTable();
    });

    test('should add a key-value pair', () => {
        hashTable.set('key1', 'value1');
        expect(hashTable.get('key1')).toBe('value1');
    });

    test('should return undefined for a non-existent key', () => {
        expect(hashTable.get('nonExistentKey')).toBeUndefined();
    });

    test('should remove a key-value pair', () => {
        hashTable.set('key2', 'value2');
        hashTable.remove('key2');
        expect(hashTable.get('key2')).toBeUndefined();
    });

    test('should handle collisions', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key1_collision', 'value2'); // Assuming this collides with key1
        expect(hashTable.get('key1')).toBe('value1');
        expect(hashTable.get('key1_collision')).toBe('value2');
    });

    test('should return all keys', () => {
        hashTable.set('key3', 'value3');
        hashTable.set('key4', 'value4');
        const keys = hashTable.keys();
        expect(keys).toContain('key3');
        expect(keys).toContain('key4');
    });
});