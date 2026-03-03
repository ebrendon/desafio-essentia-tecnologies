import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'The user email' })
    email: string;

    @ApiProperty({ example: 'StrongPassword123!', description: 'The user password' })
    password: string;
}
