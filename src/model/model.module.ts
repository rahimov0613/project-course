import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports:[CourseModule],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
