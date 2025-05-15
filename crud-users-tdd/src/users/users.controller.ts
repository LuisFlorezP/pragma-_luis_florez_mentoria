import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /**
     * Create a new user.
     * @param {CreateUserDto} createUserDto - Data transfer object containing user creation data.
     * @returns {string} A message indicating the user has been successfully created.
     */
    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.usersService.create(createUserDto);
    }

    /**
     * Get all users.
     * @returns {User[]} An array of all users.
     */
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    async findAll(): Promise<User[]> {        
        return this.usersService.findAll();
    }

    /**
     * Get a user by ID.
     * @param {number} id - The ID of the user to retrieve.
     * @returns {User} The user with the specified ID.
     */
    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user with the specified ID.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(+id);
    }

    /**
     * Partially update a user.
     * @param {number} id - The ID of the user to partially update.
     * @param {PartialUpdateUserDto} partialUpdateUserDto - Data transfer object containing partial user update data.
     * @returns {string} A message indicating the user has been successfully updated.
     */
    @Patch(':id')
    @ApiOperation({ summary: 'Partially update user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async partialUpdate(@Param('id') id: number, @Body() partialUpdateUserDto: PartialUpdateUserDto): Promise<string> {        
        return this.usersService.partialUpdate(+id, partialUpdateUserDto);
    }
    
    /**
     * Update a user.
     * @param {number} id - The ID of the user to update.
     * @param {UpdateUserDto} updateUserDto - Data transfer object containing user update data.
     * @returns {User} The updated user.
     */
    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<string> {
        return this.usersService.update(+id, updateUserDto);
    }

    /**
     * Delete a user.
     * @param {number} id - The ID of the user to delete.
     * @returns {string} A message indicating the user has been successfully deleted.
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async remove(@Param('id') id: number): Promise<string> {
        return this.usersService.remove(+id);
    }
}
