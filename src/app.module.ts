import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './services/task/task.service';
import { TaskModule } from './services/task/task.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
