import { Controller, Post, Res, Body, HttpStatus, Req } from '@nestjs/common';

import { Response } from 'express';
import { UserAuthValidator } from 'src/validators/auth_user.validator';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { generateJwt } from 'src/helpers/generateJwt';
import { sidebarData } from 'src/helpers/sidebar-data';

@Controller('auth')
export class AuthController {

  constructor(
    private userService: AuthService
  ){}

  @Post()
  public async login( @Body() userData: UserAuthValidator ,@Res() res: Response){

    const user = await this.userService.findByEmail(userData.email);

    if (!user){
      return res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'Datos incorrectos'
      });
    }
    
    const isMatch = await bcrypt.compare(userData.password, user.password);

    
    if (!isMatch){
      return res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'Datos incorrectos'
      });
    }

    const token = await generateJwt(user.id);
    const sData = sidebarData(user.type);

    return res.json({
      user,
      token,
      sidebarData: sData
    });

    
  }

  @Post('renew')
  public async renewToken(@Req() req, @Res() res: Response){

    const uid = req.uid;

    const user = await this.userService.findById(uid);

    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese usuario'
      });
    }

    const token = await generateJwt(user.id);
    const sData = sidebarData(user.type);

    return res.status(HttpStatus.OK).json({
      user,
      token,
      sidebarData: sData
    });

  }

}
