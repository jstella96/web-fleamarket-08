import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Like } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(private readonly configService: ConfigService) {}

  async findAll(value: string) {
    return await Region.findBy({ name: Like(`%${value}%`) });
  }

  async getLocation(coords: string) {
    const {
      data: { results },
    } = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&output=json&orders=legalcode`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': this.configService.get<string>(
            'X-NCP-APIGW-API-KEY-ID'
          ),
          'X-NCP-APIGW-API-KEY': this.configService.get<string>(
            'X-NCP-APIGW-API-KEY'
          ),
        },
      }
    );
    return { cood: results[0]?.code?.id, name: results[0]?.region?.area3.name };
  }
}
