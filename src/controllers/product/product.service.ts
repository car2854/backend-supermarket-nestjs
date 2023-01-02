import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { UpdateProductValidator } from 'src/validators/update_product.validator';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  public create = (id: number, data: any) => {
    data.user_table_id = id;
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }


  public findById = (id:number) => {
    return this.productRepository.findOne({where: {id: id, is_active: true}});
  }

  public find = () => {
    return this.productRepository.find({where: {is_active: true}});
  }

  public update = (id:number, productData: UpdateProductValidator) => {
    return this.productRepository.update({id}, productData);
  }
}
