import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    name: string;
    
    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email: string;
    
    @ApiProperty({ example: 'StrongPassword123!', description: 'The password of the user' })
    password: string;
    
    @ApiProperty({ example: 'USER', enum: Roles, description: 'The role of the user (ADMIN or USER)' })
    role: Roles;
}
