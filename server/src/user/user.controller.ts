import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateUserRegionDto } from './dto/create-user-region.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/region')
  async createRegion(
    @Body() createUserRegionDto: CreateUserRegionDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return this.userService.createRegion(createUserRegionDto, userId);
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
