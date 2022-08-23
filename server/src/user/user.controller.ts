import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
  Get,
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

  @Get('')
  async findUser(@Req() request: Request) {
    const userId = request['userId'];
    return this.userService.findUser(userId);
  }

  @Post('/region')
  async createRegion(
    @Body() createUserRegionDto: CreateUserRegionDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return this.userService.createRegion(createUserRegionDto, userId);
  }

  @Delete('/region/:code')
  async deleteRegion(@Param('code') code: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.userService.deleteRegion(code, userId);
  }

  @Post('/region/:code/primary')
  async setRegionPrimary(@Param('code') code: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.userService.setRegionPrimary(code, userId);
  }
}
