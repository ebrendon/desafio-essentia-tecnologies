import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
        return this.tasksService.create({
            ...createTaskDto,
            authorId: req.user!.id,
        });
    }

    @Get()
    @ApiOperation({ summary: 'List all tasks' })
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a task by ID' })
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a task by ID' })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task by ID' })
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}
