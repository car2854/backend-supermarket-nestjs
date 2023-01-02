import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserTable } from 'src/entities/user.entity';
import { CreateUserValidator } from 'src/validators/create_user.validator';
import { UpdateUserValidator } from 'src/validators/update_user.validator';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserTable)
    private usersRepository: Repository<UserTable>
  ){}

  
  public findAll(){
    return this.usersRepository.find({where: {is_active: true}});
  }

  public findOneEmail(email:string){
    return this.usersRepository.findOne({where: {email: email}});
  }

  public findOneById(id:number){
    return this.usersRepository.findOne({where: {id: id}});
  }

  public create(data: CreateUserValidator){
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  public delete(id: number){
    return this.usersRepository.update({id}, {is_active: false});
  }

  public update(id: number, data: UpdateUserValidator){
    return this.usersRepository.update({id}, data);
  }


}
