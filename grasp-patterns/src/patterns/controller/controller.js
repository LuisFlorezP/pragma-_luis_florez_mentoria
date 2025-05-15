/**
 * GRASP Pattern: Controller
 * 
 * Principle: Assign the responsibility of handling system events to a class 
 * that represents either the overall system or a use case scenario.
 */

export class Controller {
  constructor() {
    this.services = {
      userService: {
        getUser: (id) => ({ id, name: 'John Doe' })
      },
      orderService: {
        createOrder: (userId, items) => ({ id: 'ord-123', userId, items, date: new Date() })
      },
      paymentService: {
        processPayment: (amount) => ({ success: true, transactionId: 'tx-456' })
      }
    };
  }

  handleEvent() {
    console.log('Controller: Handling system event');
    
    // Controller coordinates the flow but delegates the actual work
    const userId = 'user-123';
    const user = this.services.userService.getUser(userId);
    console.log(`Controller: Retrieved user ${user.name}`);
    
    const items = [{ id: 'item-1', name: 'Product A', price: 50 }];
    const order = this.services.orderService.createOrder(userId, items);
    console.log(`Controller: Created order ${order.id}`);
    
    const payment = this.services.paymentService.processPayment(50);
    console.log(`Controller: Processed payment ${payment.transactionId}`);
    
    return { success: true, message: 'Event processed successfully' };
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Controller Example\n');
  const controller = new Controller();
  const result = controller.handleEvent();
  console.log('\nResult:', result);
}