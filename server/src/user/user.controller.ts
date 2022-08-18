import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRegionDto } from './dto/create-user-region.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/region')
  async createRegion(@Body() createUserRegionDto: CreateUserRegionDto) {
    return this.userService.createRegion(createUserRegionDto);
  }

  @Delete('/region/:code')
  async deleteRegion(@Param('code') code: number) {
    return this.userService.deleteRegion(code);
  }

  @Post('/region/:code/primary')
  async setRegionPrimary(@Param('code') code: number) {
    return this.userService.setRegionPrimary(code);
  }
}
