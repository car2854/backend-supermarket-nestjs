import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { BranchOffice } from './entities/branch_office.entity';
import { UserTable } from './entities/user.entity';

import { ConfigModule } from '@nestjs/config';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({

      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserTable, BranchOffice, Product, Category],
      synchronize: true,
      autoLoadEntities: true,
      
    }),
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    private dataSource: DataSource
  ){}
}
