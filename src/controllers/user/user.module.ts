import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTable } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTable])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {

  

}
