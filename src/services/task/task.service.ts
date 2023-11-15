import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';
import { Task } from './entities/task.entity';
import { validate } from 'class-validator';

@Injectable()
export class TaskService {
  prisma = new PrismaClient();

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const errors = await validate(createTaskDto);

    if (errors.length > 0) {
      // Construct a message that includes all missing fields
      let missingFields = errors
        .map((error) => Object.keys(error.constraints))
        .join(', ');
      throw new BadRequestException(`You missed fields: ${missingFields}`);
    }

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        dueDate: createTaskDto.dueDate,
        isComplete: false,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({});
  }

  async findOne(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    // Merge existing data with update data
    const updateData = { ...existingTask, ...updateTaskDto };

    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
}

  async remove(id: number): Promise<void> {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    await this.prisma.task.delete({
      where: { id },
    });
  }

  async updateTaskCompletion(
    id: number,
    isComplete: boolean,
  ): Promise<Task | null> {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        isComplete: isComplete,
      },
    });
  }
}
