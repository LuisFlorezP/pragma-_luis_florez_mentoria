import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private currentId = 1;

    /**
     * Create a new user.
     * @param {CreateUserDto} createUserDto - Data transfer object containing user creation data.
     * @returns {string} A message indicating the user has been successfully created.
     */
    create(createUserDto: CreateUserDto): string {
        const { name, age, email } = createUserDto;
        const id = this.currentId++;
        this.users.push(new User(id, name, age, email));
        return `User ${createUserDto.name} created successfully`;
    }

    /**
     * Get all users.
     * @returns {User[]} An array of all users.
     */
    findAll(): User[] {
        return this.users;
    }

    /**
     * Get a user by ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {User} The user with the specified ID.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    findOne(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    /**
     * Partially updates a user's information.
     * @param {number} id - The ID of the user to update.
     * @param {PartialUpdateUserDto} partialUpdateUserDto - The data to update the user with.
     * @returns {string} A message indicating the user was updated successfully.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    partialUpdate(id: number, partialUpdateUserDto: PartialUpdateUserDto): string {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users[userIndex] = { ...this.users[userIndex], ...partialUpdateUserDto };
        return 'User updated successfully';
    }

    /**
     * Update a user.
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - Data transfer object containing user update data.
     * @returns {User} The updated user.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    update(id: number, updateUserDto: UpdateUserDto): string {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return 'User updated successfully';
    }

    /**
     * Remove a user by ID.
     * @param {number} id - The ID of the user to remove.
     * @returns {string} A message indicating the user has been successfully deleted.
     * @throws {NotFoundException} If the user with the specified ID is not found.
     */
    remove(id: number): string {
        const user = this.findOne(id);
        this.users.splice(this.users.indexOf(user), 1);
        return `User ${user.name} deleted successfully`;
    }
}
