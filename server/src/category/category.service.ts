import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  findAll() {
    return [{ code: '', name: '', iconUrl: '' }];
  }
}
