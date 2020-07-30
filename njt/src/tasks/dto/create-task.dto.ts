import { Taskstatus } from '../task-status.enum';
import { IsNotEmpty } from 'class-validator'
export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    status: Taskstatus;
}