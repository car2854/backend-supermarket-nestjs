import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserAuthValidator{

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

} 