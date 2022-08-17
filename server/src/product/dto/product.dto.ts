import { PickType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class ProductDto extends PickType(Product, [
  'title',
  'price',
  'content',
  'images',
]) {}
