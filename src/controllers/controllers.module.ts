import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTable } from 'src/entities/user.entity';
import { ValidateTokenMiddleware } from 'src/middlewares/validateToken';

import { UserController } from './user/user.controller';
import { CategoryModule } from './category/category.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTable]),
    AuthModule, 
    ProductModule, 
    UserModule, CategoryModule, MapModule
  ],
  controllers: []
})
export class ControllersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateTokenMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.PUT },
        { path: 'user', method: RequestMethod.DELETE },
        { path: 'auth/renew', method: RequestMethod.POST },
        { path: 'product', method: RequestMethod.POST },
        { path: 'product/*', method: RequestMethod.PUT },
        { path: 'category', method: RequestMethod.POST },
      )
  }
}
