import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { UpdateProductValidator } from 'src/validators/update_product.validator';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  public create = (data: any) => {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }


  public findById = (id:number) => {
    return this.productRepository.findOne({where: {id: id, is_active: true}});
  }

  public find = (query:string) => {
    return this.productRepository.find({
        where: {
          is_active: true,
          name: ILike(`%${query}%`)
        },
        
        relations: ['category', 'user_table']
      });
  }

  public update = (id:number, productData: UpdateProductValidator) => {
    return this.productRepository.update({id}, productData);
  }
}
