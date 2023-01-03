import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/entities/category.entity';
import { UserService } from '../user/user.service';
import { UserTable } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, UserTable])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, UserService]
})
export class ProductModule {}
