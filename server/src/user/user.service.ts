import { Body, Injectable } from '@nestjs/common';
import { CreateUserRegionDto } from './dto/create-user-region.dto';

@Injectable()
export class UserService {
  createRegion(@Body() createUserRegionDto: CreateUserRegionDto) {
    return { code: '', name: '', isPrimary: true };
  }
}
