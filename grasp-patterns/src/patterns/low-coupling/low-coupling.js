/**
 * GRASP Pattern: Low Coupling
 * 
 * Principle: Assign responsibilities to minimize coupling between classes.
 * Low coupling promotes reusability and reduces the impact of changes.
 */

// Interface for notification channels
class NotificationChannel {
  send(message, recipient) {
    throw new Error('Method must be implemented by subclasses');
  }
}

// Concrete implementations
class EmailChannel extends NotificationChannel {
  send(message, recipient) {
    console.log(`EmailChannel: Sending email to ${recipient}`);
    console.log(`EmailChannel: Message: ${message}`);
    return true;
  }
}

class SMSChannel extends NotificationChannel {
  send(message, recipient) {
    console.log(`SMSChannel: Sending SMS to ${recipient}`);
    console.log(`SMSChannel: Message: ${message}`);
    return true;
  }
}

// Service with low coupling to notification channels
class NotificationService {
  constructor(channel) {
    this.channel = channel;
  }
  
  setChannel(channel) {
    this.channel = channel;
  }
  
  notify(message, recipient) {
    return this.channel.send(message, recipient);
  }
}

export class LowCoupling {
  establishRelationships() {
    console.log('LowCoupling: Demonstrating Low Coupling pattern');
    
    // Create different notification channels
    const emailChannel = new EmailChannel();
    const smsChannel = new SMSChannel();
    
    // Create notification service with initial channel
    const notificationService = new NotificationService(emailChannel);
    console.log('LowCoupling: Using email channel:');
    notificationService.notify('Welcome to our service!', 'user@example.com');
    
    // Change channel without modifying NotificationService
    console.log('\nLowCoupling: Switching to SMS channel:');
    notificationService.setChannel(smsChannel);
    notificationService.notify('Your order has been shipped', '+123456789');
    
    return { notificationService, emailChannel, smsChannel };
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Low Coupling Example\n');
  const lowCoupling = new LowCoupling();
  lowCoupling.establishRelationships();
}