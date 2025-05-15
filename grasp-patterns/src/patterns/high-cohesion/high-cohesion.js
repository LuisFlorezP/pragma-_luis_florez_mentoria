/**
 * GRASP Pattern: High Cohesion
 * 
 * Principle: Assign responsibilities to keep cohesion high.
 * A class with high cohesion has closely related responsibilities.
 */

// Highly cohesive class for user authentication
class AuthenticationService {
  login(username, password) {
    console.log(`AuthenticationService: Authenticating user ${username}`);
    return { success: true, token: 'sample-token' };
  }
  
  validateToken(token) {
    console.log(`AuthenticationService: Validating token`);
    return true;
  }
  
  logout(userId) {
    console.log(`AuthenticationService: Logging out user ${userId}`);
    return true;
  }
}

// Highly cohesive class for user profile management
class UserProfileService {
  getProfile(userId) {
    console.log(`UserProfileService: Getting profile for user ${userId}`);
    return { id: userId, name: 'John Doe', email: 'john@example.com' };
  }
  
  updateProfile(userId, data) {
    console.log(`UserProfileService: Updating profile for user ${userId}`);
    return true;
  }
}

export class HighCohesion {
  operateOnData() {
    console.log('HighCohesion: Demonstrating High Cohesion pattern');
    
    // Using highly cohesive classes
    const authService = new AuthenticationService();
    const profileService = new UserProfileService();
    
    // Authentication operations are grouped in AuthenticationService
    const loginResult = authService.login('johndoe', 'password123');
    console.log(`HighCohesion: Login result: ${loginResult.success ? 'Success' : 'Failed'}`);
    
    // Profile operations are grouped in UserProfileService
    const userProfile = profileService.getProfile('user-123');
    console.log(`HighCohesion: Retrieved user profile for ${userProfile.name}`);
    
    return { authService, profileService };
  }
}

// Example of usage if file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('GRASP Pattern: High Cohesion Example\n');
  const highCohesion = new HighCohesion();
  highCohesion.operateOnData();
}