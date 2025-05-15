import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { User } from './models/user.model';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    /**
     * Create a new user.
     * @param {CreateUserDto} createUserDto - Data transfer object containing user creation data.
     * @returns {Promise<string>} A message indicating the user has been successfully created.
     */
    async create(createUserDto: CreateUserDto): Promise<string> {
        await this.usersRepository.save(createUserDto);
        return `User ${createUserDto.name} created successfully`;
    }

    /**
     * Get all users.
     * @returns {Promise<User[]>} An array of all users.
     */
    async findAll(): Promise<User[]> {
        this.logger.log('Buscando todos los usuarios');
        try {
            const users = await this.usersRepository.find();
            this.logger.debug(`Se encontraron ${users.length} usuarios`);
            return users.map(user => this.mapEntityToModel(user));
        } catch (error) {
            this.logger.error(`Error al buscar usuarios: ${error.message}`, error.stack);
            throw error;
        }
    }

    /**
     * Get a user by ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<User>} The user with the specified ID.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    async findOne(id: number): Promise<User> {
        this.logger.log(`Buscando usuario con ID: ${id}`);
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.mapEntityToModel(user);
    }

    /**
     * Partially updates a user's information.
     * @param {number} id - The ID of the user to update.
     * @param {PartialUpdateUserDto} partialUpdateUserDto - The data to update the user with.
     * @returns {Promise<string>} A message indicating the user has been successfully updated.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    async partialUpdate(id: number, partialUpdateUserDto: PartialUpdateUserDto): Promise<string> {
        const result = await this.usersRepository.update(id, partialUpdateUserDto);
        if (result.affected === 0) {
            throw new NotFoundException('User not found');
        }
        return 'User updated successfully';
    }

    /**
     * Update a user.
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - Data transfer object containing user update data.
     * @returns {Promise<string>} A message indicating the user has been successfully updated.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    async update(id: number, updateUserDto: UpdateUserDto): Promise<string> {
        const result = await this.usersRepository.update(id, updateUserDto);
        if (result.affected === 0) {
            throw new NotFoundException('User not found');
        }
        return 'User updated successfully';
    }

    /**
     * Remove a user by ID.
     * @param {number} id - The ID of the user to remove.
     * @returns {Promise<string>} A message indicating the user has been successfully deleted.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    async remove(id: number): Promise<string> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return `User deleted successfully`;
    }

    private mapEntityToModel(entity: UserEntity): User {
        const user = new User(entity.id, entity.name, entity.age, entity.email);
        return user;
    }
}
