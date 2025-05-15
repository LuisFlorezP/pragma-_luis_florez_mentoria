/**
 * GRASP Pattern: Indirection
 * 
 * Principle: Assign the responsibility to an intermediate object to mediate
 * between components or services to reduce direct coupling between them.
 */

// External payment providers
class PayPalAPI {
  processPayment(amount, currency, accountId) {
    console.log(`PayPalAPI: Processing $${amount} ${currency} payment`);
    return { success: true, transactionId: `paypal-${Date.now()}` };
  }
}

class StripeAPI {
  createCharge(amountInCents, currency, token) {
    console.log(`StripeAPI: Creating charge for ${amountInCents/100} ${currency}`);
    return { id: `stripe-${Date.now()}`, status: 'succeeded' };
  }
}

// INDIRECTION: Mediator that provides a unified interface to external services
class PaymentGateway {
  constructor() {
    this.paypalApi = new PayPalAPI();
    this.stripeApi = new StripeAPI();
  }
  
  processPayment(paymentMethod, amount, currency, details) {
    console.log(`PaymentGateway: Processing payment via ${paymentMethod}`);
    
    if (paymentMethod === 'paypal') {
      const result = this.paypalApi.processPayment(
        amount, 
        currency,
        details.accountId
      );
      
      return {
        success: result.success,
        transactionId: result.transactionId
      };
    } 
    else if (paymentMethod === 'stripe') {
      const result = this.stripeApi.createCharge(
        Math.round(amount * 100), // Stripe uses cents
        currency,
        details.token
      );
      
      return {
        success: result.status === 'succeeded',
        transactionId: result.id
      };
    } 
    else {
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
  }
}

export class Indirection {
  handleCommunication() {
    console.log('Indirection: Demonstrating Indirection pattern');
    
    // Create the intermediary object
    const paymentGateway = new PaymentGateway();
    
    // Use the intermediary to process payments without directly coupling to providers
    console.log('\nIndirection: Processing PayPal payment:');
    const paypalResult = paymentGateway.processPayment(
      'paypal',
      99.99,
      'USD',
      { accountId: 'user@example.com' }
    );
    
    console.log(`Indirection: PayPal payment result: ${paypalResult.success ? 'Success' : 'Failed'}`);
    console.log(`Indirection: Transaction ID: ${paypalResult.transactionId}\n`);
    
    console.log('Indirection: Processing Stripe payment:');
    const stripeResult = paymentGateway.processPayment(
      'stripe',
      49.99,
      'USD',
      { token: 'tok_visa' }
    );
    
    console.log(`Indirection: Stripe payment result: ${stripeResult.success ? 'Success' : 'Failed'}`);
    console.log(`Indirection: Transaction ID: ${stripeResult.transactionId}`);
    
    return paymentGateway;
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Indirection Example\n');
  const indirection = new Indirection();
  indirection.handleCommunication();
}