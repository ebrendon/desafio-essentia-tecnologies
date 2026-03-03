import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    @ApiOperation({ summary: 'Authenticate and receive a JWT token' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
