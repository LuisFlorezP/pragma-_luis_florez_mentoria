/**
 * GRASP Pattern: Creator
 * 
 * Principle: Assign the responsibility of creating an instance to a class that:
 * - Contains or aggregates the instance
 * - Stores the instance
 * - Closely uses the instance
 * - Has the initializing data for the instance
 */

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class OrderItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
  
  getSubtotal() {
    return this.product.price * this.quantity;
  }
}

export class Creator {
  createProduct() {
    console.log('Creator: Creating a new product');
    
    // Create a product
    const product = new Product('prod-123', 'Example Product', 29.99);
    
    // Create an order item that uses the product (Creator pattern)
    const orderItem = new OrderItem(product, 2);
    
    console.log(`Creator: Created product ${product.name}`);
    console.log(`Creator: Created order item with subtotal ${orderItem.getSubtotal()}`);
    
    return product;
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Creator Example\n');
  const creator = new Creator();
  const product = creator.createProduct();
  console.log('\nCreated product:', product);
}