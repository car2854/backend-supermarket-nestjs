import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryValidator } from 'src/validators/create_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  public create = (data: CreateCategoryValidator) => {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  public find = () => {
    return this.categoryRepository.find();
  }

  public findById = (id:number) => {
    return this.categoryRepository.findOne({where: {id: id}});
  }

  public delete = (id:number) => {
    return this.categoryRepository.delete(id);
  }

}
