import { Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepo:Repository<Model>,
    private courseService:CourseService,
  ){}

  async create(dto:CreateModelDto):Promise<Model>{
    const course = await this.courseService.findOne(dto.courseId);
    if(!course){
      throw new Error('Bunday kurs mavjud emas');
    }
    const model = this.modelRepo.create({ ...dto, course });
    return this.modelRepo.save(model);
  }
}
