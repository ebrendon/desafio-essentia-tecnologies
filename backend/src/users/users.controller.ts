import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'List all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
