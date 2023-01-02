import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UserTable } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserTable)
    private usersRepository: Repository<UserTable>
  ){}

  public findByEmail(email: string){
    return this.usersRepository.findOne({where: {email: email}});
  }

  public findById(id:number){
    return this.usersRepository.findOne({where: {id:id, is_active: true}});
  }

}
