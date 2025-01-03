import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@src/users/models/user.model';
import { UsersController } from '@src/users/users.controller';
import { UsersService } from '@src/users/users.service';

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
    it('should call UsersService and return the created user', async () => {
      const createUserDto = { name: 'John Doe', age: 20, email: 'john@example.com' };
      const expectedMessage = `User ${createUserDto.name} created successfully`;

      jest.spyOn(service, 'create').mockImplementation(() => expectedMessage);

      const result = controller.create(createUserDto);

      expect(result).toEqual(expectedMessage);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call UsersService and return an array of users', async () => {
      const findAllMock = [new User(1, 'John Doe', 20, 'john@example.com')];

      jest.spyOn(service, 'findAll').mockImplementation(() => findAllMock);

      const result = controller.findAll();

      expect(result).toEqual(findAllMock);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call UsersService and return a single user', async () => {
      const findOneMock = new User(1, 'John Doe', 20, 'john@example.com');

      jest.spyOn(service, 'findOne').mockImplementation(() => findOneMock);

      const result = controller.findOne(1);

      expect(result).toEqual(findOneMock);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('partialUpdate', () => {
    it('should call UsersService and return the partially updated user', async () => {
      const partialUpdateUserDto = { age: 22 };
      const expectedMessage = 'User updated successfully';

      jest.spyOn(service, 'partialUpdate').mockImplementation(() => expectedMessage);

      const result = controller.partialUpdate(1, partialUpdateUserDto);

      expect(result).toEqual(expectedMessage);
      expect(service.partialUpdate).toHaveBeenCalledWith(1, partialUpdateUserDto);
    });
  });

  describe('update', () => {
    it('should call UsersService and return the updated user', async () => {
      const updateUserDto = { name: 'John Doe', age: 21, email: 'john@example.com' };
      const expectedMessage = `User updated successfully`;

      jest.spyOn(service, 'update').mockImplementation(() => expectedMessage);

      const result = controller.update(1, updateUserDto);

      expect(result).toEqual(expectedMessage);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call UsersService and return the removed user', async () => {
      const expectedMessage = `User 'John Doe' created successfully`;

      jest.spyOn(service, 'remove').mockImplementation(() => expectedMessage);

      const result = controller.remove(1);

      expect(result).toEqual(expectedMessage);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
