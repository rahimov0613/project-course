import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,
  ) { }

  async createEnrollment(user: User, course:Course):Promise<Enrollment> {
    const existingEnrollment = await this.enrollmentRepo.findOneBy({ user: { id: user.id }, course: { id: course.id } })
    if (existingEnrollment) {
      return existingEnrollment;
    }
    const enrollment = this.enrollmentRepo.create({ user, course })
    return this.enrollmentRepo.save(enrollment);
  }
  async isEnrolled(userId:number, courseId:number){
    const search = await this.enrollmentRepo.findOneBy({user:{id:userId}, course:{id:courseId}})
    if(!search){
      return false;
    }
    return true;
  }
  async getcoursesByUser(userId: number) {
    return this.enrollmentRepo.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepo.find({ relations: ['user', 'course'] });
  }
  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!enrollment) {
      throw new Error('Bunday ro\'yxatdan o\'tish mavjud emas');
    }
    return enrollment;
  }
  async update(id: number, dto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    Object.assign(enrollment, dto);
    return this.enrollmentRepo.save(enrollment);
  }
  async remove(id: number): Promise<void> {
    const enrollment = await this.findOne(id);
    if (!enrollment) {
      throw new Error('Bunday ro\'yxatdan o\'tish mavjud emas');
    }
    await this.enrollmentRepo.remove(enrollment);
  }
}
