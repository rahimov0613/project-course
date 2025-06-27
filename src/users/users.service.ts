import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository:Repository<User>){}
  async create(dto:CreateUserDto):Promise<User>{
    const uniqueEmail = await this.userRepository.findOneBy({email:dto.email});
    if(uniqueEmail){
      throw new ConflictException('Bu email allaqachon mavjud');
    }
    
  } 
}
