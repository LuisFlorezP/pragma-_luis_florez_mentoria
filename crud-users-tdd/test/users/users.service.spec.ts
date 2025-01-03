import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@src/users/users.service';
import { User } from '@src/users/models/user.model';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return a success message', () => {
      const createUserDto = { name: 'John Doe', age: 20, email: 'john@example.com' };
      const expectedMessage = `User ${createUserDto.name} created successfully`;

      const result = service.create(createUserDto);

      expect(result).toEqual(expectedMessage);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const users = [new User(1, 'John Doe', 20, 'john@example.com')];

      Object.defineProperty(service, 'users', { value: users });

      const result = service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', () => {
      const user = new User(1, 'John Doe', 20, 'john@example.com');

      Object.defineProperty(service, 'users', { value: [user] });

      const result = service.findOne(1);

      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.findOne(999)).toThrow('User not found');
    });
  });

  describe('partialUpdate', () => {
    it('should return the partially updated user', () => {
      const user = new User(1, 'John Doe', 20, 'john@example.com');
      const partialUpdateUserDto = { age: 22 };
      const expectedMessage = 'User updated successfully';

      Object.defineProperty(service, 'users', { value: [user] });

      const result = service.partialUpdate(1, partialUpdateUserDto);

      expect(result).toEqual(expectedMessage);
    });

    it('should throw NotFoundException if user is not found', () => {
      const partialUpdateUserDto = { age: 22 };
      expect(() => service.partialUpdate(999, partialUpdateUserDto)).toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should return the updated user', () => {
      const updateUserDto = { name: 'John Doe', age: 21, email: 'john@example.com' };
      const updatedUser = new User(1, updateUserDto.name, updateUserDto.age, updateUserDto.email);
      const expectedMessage = `User updated successfully`;

      Object.defineProperty(service, 'users', { value: [updatedUser] });

      const result = service.update(1, updateUserDto);

      expect(result).toEqual(expectedMessage);
    });

    it('should throw NotFoundException if user is not found', () => {
      const updateUserDto = { name: 'John Doe', age: 21, email: 'john@example.com' };
      expect(() => service.update(999, updateUserDto)).toThrow('User not found');
    });
  });

  describe('remove', () => {
    it('should return the removed user', () => {
      const user = new User(1, 'John Doe', 20, 'john@example.com');
      const expectedMessage = `User ${user.name} deleted successfully`;

      Object.defineProperty(service, 'users', { value: [user] });

      const result = service.remove(1);

      expect(result).toEqual(expectedMessage);
    });

    it('should throw NotFoundException if user is not found', () => {
      expect(() => service.remove(999)).toThrow('User not found');
    });
  });
});
