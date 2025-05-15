import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from '../../src/users/users.service';
import { UserEntity } from '../../src/users/entities/user.entity';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';
import { PartialUpdateUserDto } from '../../src/users/dto/partial-update-user.dto';
import { User } from '../../src/users/models/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<UserEntity>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return a success message', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        age: 30,
      };

      mockRepository.save.mockResolvedValue(createUserDto);
      
      const result = await service.create(createUserDto);
      expect(result).toEqual('User Test User created successfully');
      expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const userEntities = [
        {
          id: 1,
          name: 'Test User 1',
          email: 'test1@example.com',
          age: 30,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Test User 2',
          email: 'test2@example.com',
          age: 25,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedUsers: User[] = [
        { id: 1, name: 'Test User 1', email: 'test1@example.com', age: 30 },
        { id: 2, name: 'Test User 2', email: 'test2@example.com', age: 25 },
      ];

      mockRepository.find.mockResolvedValue(userEntities);
      
      const result = await service.findAll();
      expect(result).toEqual(expectedUsers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userEntity = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        age: 30,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const expectedUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        age: 30,
      };

      mockRepository.findOne.mockResolvedValue(userEntity);
      
      const result = await service.findOne(1);
      expect(result).toEqual(expectedUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('partialUpdate', () => {
    it('should return the partially updated user', async () => {
      const partialUpdateUserDto: PartialUpdateUserDto = { name: 'Updated Name' };
      
      mockRepository.update.mockResolvedValue({ affected: 1 });
      
      const result = await service.partialUpdate(1, partialUpdateUserDto);
      expect(result).toEqual('User updated successfully');
      expect(mockRepository.update).toHaveBeenCalledWith(1, partialUpdateUserDto);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const partialUpdateUserDto: PartialUpdateUserDto = { name: 'Updated Name' };
      
      mockRepository.update.mockResolvedValue({ affected: 0 });
      
      await expect(service.partialUpdate(999, partialUpdateUserDto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.update).toHaveBeenCalledWith(999, partialUpdateUserDto);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        email: 'updated@example.com',
        age: 35,
      };
      
      mockRepository.update.mockResolvedValue({ affected: 1 });
      
      const result = await service.update(1, updateUserDto);
      expect(result).toEqual('User updated successfully');
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        email: 'updated@example.com',
        age: 35,
      };
      
      mockRepository.update.mockResolvedValue({ affected: 0 });
      
      await expect(service.update(999, updateUserDto)).rejects.toThrow(NotFoundException);
      expect(mockRepository.update).toHaveBeenCalledWith(999, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should return the removed user', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      
      const result = await service.remove(1);
      expect(result).toEqual('User deleted successfully');
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });
      
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});
