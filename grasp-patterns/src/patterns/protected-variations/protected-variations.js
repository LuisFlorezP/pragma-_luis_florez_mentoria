/**
 * GRASP Pattern: Protected Variations
 * 
 * Principle: Identify points of predicted variation or instability and assign
 * responsibilities to create a stable interface around them.
 */

// Stable interface for data storage
class DataStorage {
  save(key, data) {
    throw new Error('Method must be implemented by subclasses');
  }
  
  load(key) {
    throw new Error('Method must be implemented by subclasses');
  }
}

// Concrete implementations that can vary
class LocalStorage extends DataStorage {
  constructor() {
    super();
    this.data = {};
  }
  
  save(key, data) {
    console.log(`LocalStorage: Saving data for key "${key}"`);
    this.data[key] = data;
    return true;
  }
  
  load(key) {
    console.log(`LocalStorage: Loading data for key "${key}"`);
    return this.data[key];
  }
}

class CloudStorage extends DataStorage {
  constructor() {
    super();
    console.log('CloudStorage: Initializing cloud connection');
    this.data = {};
  }
  
  save(key, data) {
    console.log(`CloudStorage: Uploading data for key "${key}"`);
    this.data[key] = data;
    return true;
  }
  
  load(key) {
    console.log(`CloudStorage: Downloading data for key "${key}"`);
    return this.data[key];
  }
}

// Client that is protected from variations in storage implementations
class UserPreferences {
  constructor(storageStrategy) {
    this.storage = storageStrategy;
  }
  
  setPreference(key, value) {
    return this.storage.save(`pref_${key}`, value);
  }
  
  getPreference(key) {
    return this.storage.load(`pref_${key}`);
  }
  
  // Allow changing the storage strategy at runtime
  setStorageStrategy(storageStrategy) {
    this.storage = storageStrategy;
  }
}

export class ProtectedVariations {
  implementStrategy() {
    console.log('ProtectedVariations: Demonstrating Protected Variations pattern');
    
    // Create storage implementations
    const localStorage = new LocalStorage();
    const cloudStorage = new CloudStorage();
    
    // Create client using the stable interface
    const userPreferences = new UserPreferences(localStorage);
    
    // Use local storage
    console.log('\nProtectedVariations: Using local storage:');
    userPreferences.setPreference('theme', 'dark');
    const theme = userPreferences.getPreference('theme');
    console.log(`ProtectedVariations: Theme preference: ${theme}`);
    
    // Switch to cloud storage without changing the client code
    console.log('\nProtectedVariations: Switching to cloud storage:');
    userPreferences.setStorageStrategy(cloudStorage);
    
    // Use cloud storage
    userPreferences.setPreference('language', 'en-US');
    const language = userPreferences.getPreference('language');
    console.log(`ProtectedVariations: Language preference: ${language}`);
    
    return userPreferences;
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: Protected Variations Example\n');
  const protectedVariations = new ProtectedVariations();
  protectedVariations.implementStrategy();
}