import { Controller, Post, Body, Res, HttpStatus, Get, Delete, Param } from '@nestjs/common';
import { Response } from 'express';
import { CreateCategoryValidator } from 'src/validators/create_category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ){}
  
  @Get()
  public async getCategories(@Res() res: Response){
    const categories = this.categoryService.find();
    return res.status(HttpStatus.OK).json({
      categories
    });
  }

  @Post()
  public async createCategory(@Body() dataCategory: CreateCategoryValidator, @Res() res: Response){
    const newCategory = await this.categoryService.create(dataCategory);
    return res.status(HttpStatus.OK).json({
      newCategory
    });
  }

  @Delete(':id')
  public async deleteCategory(@Param() params, @Res() res: Response){
    const category = await this.categoryService.findById(params.id);
    if (!category){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe esa categoria'
      });
    }
    const deleteCategory = await this.categoryService.delete(params.id);
    return res.status(HttpStatus.OK).json({
      deleteCategory
    });
  }
}
