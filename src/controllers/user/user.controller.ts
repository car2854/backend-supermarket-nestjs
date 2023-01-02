import { Controller, Get, Post, Body, Res, Put, Param, Delete, Req } from '@nestjs/common';

import { HttpStatus} from '@nestjs/common';
import { CreateUserValidator } from 'src/validators/create_user.validator';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { UpdateUserValidator } from 'src/validators/update_user.validator';
import { generateJwt } from 'src/helpers/generateJwt';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ){}

  @Get()
  public async getUsers(@Res() res: Response){
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      users
    });
  }

  @Put()
  public async updateUser(@Body() userData: UpdateUserValidator, @Req() req:any, @Res() res: Response){
    const user = await this.userService.findOneById(req.uid);
    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese usuario'
      });
    }
    const updateUser = await this.userService.update(req.uid, userData);
    return res.status(HttpStatus.OK).json({
      updateUser
    });
  }

  @Post()
  public async createUsers(@Body() userData : CreateUserValidator, @Res() res:Response){
    const user = await this.userService.findOneEmail(userData.email);
    
    if (user){
      return res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'El usuario ya existe'
      })
    }
    
    const salt = bcrypt.genSaltSync();
    userData.password = bcrypt.hashSync(userData.password, salt);
    
    const newUser = await this.userService.create(userData);
    
    const token = await generateJwt(newUser.id);
    
    return res.status(HttpStatus.OK).json({
      newUser,
      token
    });
  }

  @Delete()
  public async deleteUser(@Req() req:any, @Res() res){

    const user = await this.userService.findOneById(req.uid);

    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese usuario'
      });
    }

    const deleteUser = await this.userService.delete(req.uid);
    return res.status(HttpStatus.OK).json({
      deleteUser
    });
    
  }



}
