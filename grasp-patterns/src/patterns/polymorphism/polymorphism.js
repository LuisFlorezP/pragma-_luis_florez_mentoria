/**
 * GRASP Pattern: Polymorphism
 * 
 * Principle: Assign behavior-varying responsibilities to different classes
 * that implement a common interface, rather than using conditional logic.
 */

// Common interface for tax calculators
class TaxCalculator {
  calculate(amount) {
    throw new Error('Method must be implemented by subclasses');
  }
  
  getName() {
    throw new Error('Method must be implemented by subclasses');
  }
}

// Concrete implementations
class StandardTaxCalculator extends TaxCalculator {
  calculate(amount) {
    return amount * 0.21; // 21% tax
  }
  
  getName() {
    return 'Standard Tax (21%)';
  }
}

class ReducedTaxCalculator extends TaxCalculator {
  calculate(amount) {
    return amount * 0.10; // 10% reduced tax
  }
  
  getName() {
    return 'Reduced Tax (10%)';
  }
}

class TaxExemptCalculator extends TaxCalculator {
  calculate(amount) {
    return 0; // 0% tax
  }
  
  getName() {
    return 'Tax Exempt (0%)';
  }
}

export class Polymorphism {
  demonstrateUsage() {
    console.log('Polymorphism: Demonstrating Polymorphism pattern');
    
    // Create tax calculators
    const standardTax = new StandardTaxCalculator();
    const reducedTax = new ReducedTaxCalculator();
    const exemptTax = new TaxExemptCalculator();
    
    // Calculate taxes for different products using polymorphism
    const calculateAndPrint = (productName, price, taxCalculator) => {
      const taxAmount = taxCalculator.calculate(price);
      console.log(`Polymorphism: ${productName} ($${price.toFixed(2)}):`);
      console.log(`  Tax Type: ${taxCalculator.getName()}`);
      console.log(`  Tax Amount: $${taxAmount.toFixed(2)}`);
      console.log(`  Total: $${(price + taxAmount).toFixed(2)}\n`);
    };
    
    // Use polymorphic behavior without conditionals
    calculateAndPrint('Electronics', 1000, standardTax);
    calculateAndPrint('Books', 50, reducedTax);
    calculateAndPrint('Essential Medicine', 100, exemptTax);
    
    return { standardTax, reducedTax, exemptTax };
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Polymorphism Example\n');
  const polymorphism = new Polymorphism();
  polymorphism.demonstrateUsage();
}