import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
   
    dueDate: Date;

    @IsOptional()
    isComplete:boolean;
}
