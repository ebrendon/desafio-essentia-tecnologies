import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
@Controller('users')
export class UsersController {
    constructor(private readonly prismaService: PrismaService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                ...createUserDto,
                password: bcrypt.hashSync(createUserDto.password, 10),
            },
        });
    }

    @Get()
    findAll() {
        return this.prismaService.user.findMany();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.prismaService.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.prismaService.user.delete({
            where: { id },
        });
    }
}
