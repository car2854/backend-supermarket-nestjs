import { Controller, Get, Post, Req, Res, Body, Param, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { Product } from 'src/entities/product.entity';
import { CreateProductValidator } from 'src/validators/create_product.validator';
import { UpdateProductValidator } from 'src/validators/update_product.validator';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ){}

  @Get()
  public async getProducts(@Req() req, @Res() res){

    const products = await this.productService.find();

    return res.status(HttpStatus.OK).json({
      products
    });
  }

  @Get(':id')
  public async getProduct(@Param() params, @Res() res){

    const product = await this.productService.findById(params.id);

    if (!product){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese producto'
      });
    }
    
    return res.status(HttpStatus.OK).json({
      product
    });
  }

  @Post()
  public async createProduct(@Req() req, @Res() res, @Body() productData: CreateProductValidator){

    const [category, user] = await Promise.all([
      this.categoryService.findById(productData.category_id),
      this.userService.findOneById(req.uid)
    ]);

    if (!category){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe esa categoria'
      });
    }

    if (!user){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese usuario'
      })
    }

    const newProduct = new Product();
    newProduct.category = category;
    newProduct.user_table = user;

    const data = {
      ...productData,
      ...newProduct
    }

    const product =  await this.productService.create(data);

    return res.status(HttpStatus.OK).json({
      product
    });
  }

  @Put(':id')
  public async updateProduct(@Param() params, @Res() res:Response, @Body() productData: UpdateProductValidator){

    const product = await this.productService.findById(params.id);

    if (!product){
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'No existe ese producto'
      });
    }

    const updateProduct = await this.productService.update(params.id, productData);

    return res.status(HttpStatus.OK).json({
      updateProduct
    });

  }
}
