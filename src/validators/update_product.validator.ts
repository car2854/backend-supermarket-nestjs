import { IsOptional } from 'class-validator';

export class UpdateProductValidator{
  
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  category_id: number;

}