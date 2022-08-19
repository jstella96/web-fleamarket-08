import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductLike } from './entities/product-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, ProductLike])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
