import { IsString, IsInt, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 25, description: 'The age of the user' })
    @IsInt()
    readonly age: number;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    @IsEmail()
    readonly email: string;
}