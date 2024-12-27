import Singleton from './singleton';

Singleton.addData('Item 1');
Singleton.addData('Item 2');

console.log(Singleton.getData()); // Output: ['Item 1', 'Item 2']
console.log(Singleton.getData()); // Output: ['Item 1', 'Item 2']
