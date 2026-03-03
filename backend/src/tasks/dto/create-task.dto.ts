import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ example: 'Buy groceries', description: 'The title of the task' })
    title: string;

    @ApiProperty({ example: 'Milk, bread, and eggs', description: 'Detailed description of the task', required: false })
    description: string;

    @ApiProperty({ example: false, description: 'Whether the task is completed or not', default: false })
    completed: boolean;
}
