/**
 * GRASP Pattern: Pure Fabrication
 * 
 * Principle: Assign a cohesive set of responsibilities to an artificial class
 * that doesn't represent a domain concept when there's no natural home for these
 * responsibilities.
 */

// Domain classes
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class Order {
  constructor(id, customerName) {
    this.id = id;
    this.customerName = customerName;
    this.items = [];
    this.date = new Date();
  }
  
  addItem(product, quantity) {
    this.items.push({ product, quantity });
  }
  
  getTotal() {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}

// PURE FABRICATION: This class doesn't represent a domain concept
// but provides useful functionality for the application
class OrderAnalyticsService {
  constructor() {
    this.orders = [];
  }
  
  addOrder(order) {
    this.orders.push(order);
  }
  
  getAverageOrderValue() {
    if (this.orders.length === 0) return 0;
    const totalValue = this.orders.reduce((sum, order) => sum + order.getTotal(), 0);
    return totalValue / this.orders.length;
  }
  
  getMostPopularProduct() {
    if (this.orders.length === 0) return null;
    
    const productCounts = {};
    
    this.orders.forEach(order => {
      order.items.forEach(item => {
        const productId = item.product.id;
        productCounts[productId] = (productCounts[productId] || 0) + item.quantity;
      });
    });
    
    let mostPopularId = null;
    let highestCount = 0;
    
    Object.entries(productCounts).forEach(([productId, count]) => {
      if (count > highestCount) {
        mostPopularId = productId;
        highestCount = count;
      }
    });
    
    if (!mostPopularId) return null;
    
    // Find the product object
    for (const order of this.orders) {
      for (const item of order.items) {
        if (item.product.id === mostPopularId) {
          return {
            product: item.product,
            count: highestCount
          };
        }
      }
    }
    
    return null;
  }
}

export class PureFabrication {
  createInstance() {
    console.log('PureFabrication: Demonstrating Pure Fabrication pattern');
    
    // Create some domain objects
    const laptop = new Product('prod-1', 'Laptop', 1200);
    const phone = new Product('prod-2', 'Smartphone', 800);
    const headphones = new Product('prod-3', 'Headphones', 100);
    
    // Create some orders
    const order1 = new Order('ord-1', 'John Smith');
    order1.addItem(laptop, 1);
    order1.addItem(headphones, 1);
    
    const order2 = new Order('ord-2', 'Jane Doe');
    order2.addItem(phone, 1);
    order2.addItem(headphones, 2);
    
    const order3 = new Order('ord-3', 'Bob Johnson');
    order3.addItem(laptop, 1);
    order3.addItem(phone, 1);
    
    // Create the Pure Fabrication - OrderAnalyticsService
    const analyticsService = new OrderAnalyticsService();
    analyticsService.addOrder(order1);
    analyticsService.addOrder(order2);
    analyticsService.addOrder(order3);
    
    // Use the Pure Fabrication to get insights
    const averageValue = analyticsService.getAverageOrderValue();
    console.log(`PureFabrication: Average order value: $${averageValue.toFixed(2)}`);
    
    const popularProduct = analyticsService.getMostPopularProduct();
    console.log(`PureFabrication: Most popular product: ${popularProduct.product.name} (${popularProduct.count} units)`);
    
    return analyticsService;
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Pure Fabrication Example\n');
  const pureFabrication = new PureFabrication();
  pureFabrication.createInstance();
}