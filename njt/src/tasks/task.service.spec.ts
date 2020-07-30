import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Taskstatus } from './task-status.enum';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockUser = {
    id: 123,
    username: 'Fischy Fischkopp'
};
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide: TaskRepository, useFactory: mockTaskRepository }
            ],
        }).compile();
        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from repositiry', async ( ) => {
            taskRepository.getTasks.mockResolvedValue('Some Value');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = {status: Taskstatus.IN_PROGRESS, search: 'Some query'};
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('Some Value');

        });
    });

    describe('getTaskById', () => {
        it('return task with correct id', async () => {
            const mockTask = {title: 'Test task', description: 'Test desc'}
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask);
            expect(taskRepository.findOne).toHaveBeenCalledWith({ 
                where: {
                    id: 1,
                    userId: mockUser.id,
                },
            });
        });
        it('throws error if task is not found',  () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1,mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('createTask',() => {
        it('successful create a task',  async () => {
            const mockResult = 'wurm';
            const mockCreateTaskDto = {title: 'Test task', description: 'Test desc', status: Taskstatus.OPEN }
            taskRepository.createTask.mockResolvedValue(mockResult)
            const result = await tasksService.createTask(mockCreateTaskDto, mockUser);
            expect(result).toEqual(mockResult);
        }) 

    });
    describe('delete Task', () => {
        it('successful deleteion', async () => { 
            taskRepository.delete.mockResolvedValue({affected: 1});
            await tasksService.deleteTask(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({id: 1, userId: mockUser.id})

        }),
        it('error if task not found', () => {
            taskRepository.delete.mockResolvedValue({affected: 0});
            expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);

        })
    })

    describe('update task status', () => {
        it('successful update status', async () => {
            const save = jest.fn().mockResolvedValue(true);
            tasksService.getTaskById = jest.fn().mockResolvedValue({
                status: Taskstatus.OPEN,
                save,
                //save: jest.fn().mockResolvedValue(true),

            });
            const result = await tasksService.updateStatus(2, Taskstatus.DONE, mockUser);
            expect(tasksService.getTaskById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(Taskstatus.DONE)
        })
    })


});