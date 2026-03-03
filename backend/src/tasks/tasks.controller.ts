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
import { Public } from 'src/auth/decorators/public.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tasks')
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
        return this.tasksService.create({
            ...createTaskDto,
            authorId: req.user!.id,
        });
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'List all tasks' })
    findAll() {
        return this.tasksService.findAll();
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Get a task by ID' })
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Update a task by ID' })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: Request) {
        return this.tasksService.update(id, updateTaskDto, req.user!);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task by ID' })
    remove(@Param('id') id: string, @Req() req: Request) {
        return this.tasksService.remove(id, req.user!);
    }
}
