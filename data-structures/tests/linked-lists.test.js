import LinkedList from '../src/linked-lists/index.js';

describe('LinkedList', () => {
    let linkedList;

    beforeEach(() => {
        linkedList = new LinkedList();
    });

    test('should add a node to the list', () => {
        linkedList.add(1);
        expect(linkedList.head.value).toBe(1);
    });

    test('should remove a node from the list', () => {
        linkedList.add(1);
        linkedList.add(2);
        linkedList.remove(1);
        expect(linkedList.head.value).toBe(2);
    });

    test('should find a node in the list', () => {
        linkedList.add(1);
        linkedList.add(2);
        const foundNode = linkedList.find(2);
        expect(foundNode.value).toBe(2);
    });

    test('should return null when trying to find a non-existent node', () => {
        linkedList.add(1);
        const foundNode = linkedList.find(2);
        expect(foundNode).toBeNull();
    });

    test('should return the correct size of the list', () => {
        linkedList.add(1);
        linkedList.add(2);
        expect(linkedList.size()).toBe(2);
    });
});