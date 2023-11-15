import { Prisma } from '@prisma/client';
export class Task implements Prisma.TaskCreateInput {
    id: number;
    title: string;
    description?: string;
    dueDate?: Date;
  }