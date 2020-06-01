import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Taskstatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository)
        {}

    
        async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
            return this.taskRepository.getTasks(filterDto);

        }


    // getAllTasks(){
    //     return this.tasks;
    // }

    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if  (!found) {
           throw new NotFoundException(`Task with "${id}" not found!`);
        }
        return found;
        }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(t => t.id === id);
    //     if  (!found) {
    //         throw new NotFoundException(`Task with "${id}" not found!`);
    //     }
    //     return found;
    // }

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(t => t.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(t => 
    //             t.title.includes(search) || 
    //             t.description.includes(search));
    //     } 

    //     return tasks;

    // }
    createTask(createTaskDto: CreateTaskDto){
        return this.taskRepository.createTask(createTaskDto);
    }



    //     this.tasks.push(task);
    //     return task;
    // }

    async updateStatus(id: number, status: Taskstatus): Promise<Task>{
        let task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;

    }


    async deleteTask(id: number): Promise<void> {
        //const found = await this.getTaskById(id); //this throws an error if task does not exist.
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0){
            throw new NotFoundException(`Task with ID ${id} not found.`)
        }
    }

}

