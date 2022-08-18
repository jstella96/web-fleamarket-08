import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async findAll() {
    return await Category.find();
  }
}
