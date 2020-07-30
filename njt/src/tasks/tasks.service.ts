import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Taskstatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository)
        {}

    
        async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
            return this.taskRepository.getTasks(filterDto, user);

        }


    // getAllTasks(){
    //     return this.tasks;
    // }

    async getTaskById(id: number, user: User): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id, userId: user.id }});
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
    createTask(
        createTaskDto: CreateTaskDto,
        user: User){
        return this.taskRepository.createTask(createTaskDto,user);
    }



    //     this.tasks.push(task);
    //     return task;
    // }

    async updateStatus(id: number, status: Taskstatus, user: User): Promise<Task>{
        let task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;

    }


    async deleteTask(id: number, user: User): Promise<void> {
        //const found = await this.getTaskById(id); //this throws an error if task does not exist.
        const result = await this.taskRepository.delete({id, userId: user.id});

        if (result.affected === 0){
            throw new NotFoundException(`Task with ID ${id} not found.`)
        }
    }

}

