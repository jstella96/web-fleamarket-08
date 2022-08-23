import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  async findAll(value: string) {
    return await Region.findBy({ name: Like(`%${value}%`) });
  }
}
