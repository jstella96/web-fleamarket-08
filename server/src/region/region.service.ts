import { Injectable } from '@nestjs/common';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  async findAll() {
    return await Region.find();
  }
}
