import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';

@ApiTags('region')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('')
  findAll(@Query('value') value: string) {
    return this.regionService.findAll(value);
  }
}
