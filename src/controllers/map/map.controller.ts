import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('map')
export class MapController {

  @Get()
  public getApiMap(@Req() req, @Res() res: Response){

    const apiGoogle = process.env.API_GOOGLE || '';

    return res.status(HttpStatus.OK).json({
      apiToken: apiGoogle
    });
    
  }

}
