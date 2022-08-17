import { Body, Injectable, Post } from '@nestjs/common';
import { CreateUserRegionDto } from './dto/create-user-region.dto';

@Injectable()
export class UserService {
  @Post('/region')
  createRegion(@Body() createUserRegionDto: CreateUserRegionDto) {
    return { code: '', name: '', isPrimary: true };
  }
}
