import { IsNotEmpty } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateCategoryValidator{

  @IsNotEmpty()
  name: string;

}