import { Injectable } from '@nestjs/common';
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

    update(id: string, updateTaskDto: UpdateTaskDto) {
        return this.prismaService.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    remove(id: string) {
        return this.prismaService.task.delete({
            where: { id },
        });
    }
}
