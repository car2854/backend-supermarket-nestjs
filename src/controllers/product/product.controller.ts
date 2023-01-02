import { Controller, Get, Post, Req, Res, Body, Param, HttpStatus, Put } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductValidator } from 'src/validators/create_product.validator';
import { UpdateProductValidator } from 'src/validators/update_product.validator';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(
    private productService: ProductService
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

    const product =  await this.productService.create(req.uid, productData);

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
