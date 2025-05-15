import BinaryTree from '../src/trees/binary-tree.js';
import BinarySearchTree from '../src/trees/binary-search-tree.js';

describe('BinaryTree', () => {
    let tree;

    beforeEach(() => {
        tree = new BinaryTree();
    });

    test('should add nodes correctly', () => {
        tree.add(10);
        tree.add(5);
        tree.add(15);
        expect(tree.root.value).toBe(10);
        expect(tree.root.left.value).toBe(5);
        expect(tree.root.right.value).toBe(15);
    });

    test('should find nodes correctly', () => {
        tree.add(10);
        tree.add(5);
        tree.add(15);
        expect(tree.find(5)).toBeTruthy();
        expect(tree.find(15)).toBeTruthy();
        expect(tree.find(20)).toBeFalsy();
    });
});

describe('BinarySearchTree', () => {
    let bst;

    beforeEach(() => {
        bst = new BinarySearchTree();
    });

    test('should insert nodes correctly', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        expect(bst.root.value).toBe(10);
        expect(bst.root.left.value).toBe(5);
        expect(bst.root.right.value).toBe(15);
    });

    test('should remove nodes correctly', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.remove(10);
        expect(bst.root.value).toBe(15);
        expect(bst.root.left.value).toBe(5);
    });

    test('should search nodes correctly', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        expect(bst.search(5)).toBeTruthy();
        expect(bst.search(15)).toBeTruthy();
        expect(bst.search(20)).toBeFalsy();
    });
});