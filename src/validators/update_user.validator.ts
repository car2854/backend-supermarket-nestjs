import { IsOptional } from 'class-validator';

export class UpdateUserValidator {
  @IsOptional()
  name: string
}