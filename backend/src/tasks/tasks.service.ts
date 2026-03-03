import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService) {}
    create(createTaskDto: CreateTaskDto & { authorId: string }) {
        return this.prismaService.task.create({
            data: createTaskDto,
        });
    }

    findAll() {
        return this.prismaService.task.findMany();
    }

    findOne(id: string) {
        return this.prismaService.task.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, user: any) {
        const task = await this.prismaService.task.findUnique({ where: { id } });
        if (!task) throw new Error('Task not found');
        if (task.authorId !== user.id && user.role !== 'ADMIN') {
            throw new ForbiddenException('You do not have permission to modify this task');
        }
        return this.prismaService.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(id: string, user: any) {
        const task = await this.prismaService.task.findUnique({ where: { id } });
        if (!task) throw new Error('Task not found');
        if (task.authorId !== user.id && user.role !== 'ADMIN') {
            throw new ForbiddenException('You do not have permission to delete this task');
        }
        return this.prismaService.task.delete({
            where: { id },
        });
    }
}
