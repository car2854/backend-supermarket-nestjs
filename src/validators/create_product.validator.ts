import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductValidator{
  
  @IsNotEmpty() @IsString()
  name: string;

  @IsNotEmpty() @IsString()
  description: string;

  @IsNumber() @IsNotEmpty()
  category_id: number;

}