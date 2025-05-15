/**
 * GRASP Pattern: Information Expert
 * 
 * Principle: Assign a responsibility to the class that has the information
 * needed to fulfill it.
 */

class Order {
  constructor(id) {
    this.id = id;
    this.items = [];
  }
  
  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }
  
  // Order is the expert in calculating its total
  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
  
  // Order is the expert in determining its shipping status
  canShip() {
    return this.items.length > 0;
  }
}

export class Expert {
  performAction() {
    console.log('Expert: Demonstrating Information Expert pattern');
    
    const order = new Order('ord-123');
    
    order.addItem({ id: 'prod-1', name: 'Keyboard', price: 49.99 }, 1);
    order.addItem({ id: 'prod-2', name: 'Mouse', price: 29.99 }, 2);
    
    // Order is the expert in calculating the total
    const total = order.calculateTotal();
    console.log(`Expert: Order total calculated by Order class: $${total.toFixed(2)}`);
    
    // Order is the expert in determining shipping status
    const canShip = order.canShip();
    console.log(`Expert: Order shipping status determined by Order class: ${canShip ? 'Ready to ship' : 'Cannot ship'}`);
    
    return order;
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Information Expert Example\n');
  const expert = new Expert();
  expert.performAction();
}