import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Taskstatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
            Taskstatus.DONE,
            Taskstatus.IN_PROGRESS,
            Taskstatus.OPEN 
        ];

    transform(value: any) {
        value = value.toUpperCase();
        
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);            
        }


        return value;


    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}