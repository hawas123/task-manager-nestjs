import { IsOptional } from "class-validator";

export class UpdateTaskDto {

    @IsOptional()
    title: string;
  
    @IsOptional()
    description: string;
  
    @IsOptional()
   
    dueDate: Date;

    @IsOptional()
    isComplete:boolean;
}
