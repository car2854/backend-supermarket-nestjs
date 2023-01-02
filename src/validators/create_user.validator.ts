import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserValidator {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  type: string;

  @IsEmail()
  email: string;

}