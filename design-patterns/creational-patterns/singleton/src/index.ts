import Singleton from './singleton';

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.addData('Item 1');
instance2.addData('Item 2');

console.log(instance1.getData()); // Output: ['Item 1', 'Item 2']
console.log(instance2.getData()); // Output: ['Item 1', 'Item 2']
console.log(instance1 === instance2); // Output: true
