import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { User } from '../../src/users/models/user.model';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { PartialUpdateUserDto } from '../../src/users/dto/partial-update-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            partialUpdate: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'Test User', email: 'test@example.com', age: 30 };
      const expectedMessage = 'Usuario creado exitosamente';
      
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(expectedMessage));
      
      expect(await controller.create(createUserDto)).toBe(expectedMessage);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const findAllMock: User[] = [
        { id: 1, name: 'Test User 1', email: 'test1@example.com', age: 30 },
        { id: 2, name: 'Test User 2', email: 'test2@example.com', age: 25 },
      ];
      
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(findAllMock));
      
      expect(await controller.findAll()).toBe(findAllMock);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const findOneMock: User = { id: 1, name: 'Test User', email: 'test@example.com', age: 30 };
      
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(findOneMock));
      
      expect(await controller.findOne(1)).toBe(findOneMock);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('partialUpdate', () => {
    it('should update a user partially', async () => {
      const id = 1;
      const partialUpdateUserDto: PartialUpdateUserDto = { name: 'Updated User' };
      const expectedMessage = 'Usuario actualizado parcialmente con éxito';
      
      jest.spyOn(service, 'partialUpdate').mockImplementation(() => Promise.resolve(expectedMessage));
      
      expect(await controller.partialUpdate(id, partialUpdateUserDto)).toBe(expectedMessage);
      expect(service.partialUpdate).toHaveBeenCalledWith(id, partialUpdateUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = { name: 'Updated User', email: 'updated@example.com', age: 35 };
      const expectedMessage = 'Usuario actualizado exitosamente';
      
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(expectedMessage));
      
      expect(await controller.update(id, updateUserDto)).toBe(expectedMessage);
      expect(service.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 1;
      const expectedMessage = 'Usuario eliminado exitosamente';
      
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(expectedMessage));
      
      expect(await controller.remove(id)).toBe(expectedMessage);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
