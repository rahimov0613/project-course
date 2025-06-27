import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { UsersModule } from 'src/users/users.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports:[TypeOrmModule.forFeature([Enrollment]),UsersModule,CourseModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
