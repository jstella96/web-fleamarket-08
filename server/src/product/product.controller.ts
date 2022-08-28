import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guards';
import { Request } from 'express';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() productDto: ProductDto, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.create(productDto, userId);
  }

  @ApiQuery({ name: 'regionCode', type: Number, required: false })
  @ApiQuery({ name: 'type', type: String, required: false })
  @ApiQuery({ name: 'categoryId', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @Get('')
  findAll(
    @Query('type') type: string,
    @Query('categoryId') categoryId: number,
    @Query('page') page: number,
    @Query('regionCode') regionCode: number,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    if (type === 'like') {
      return this.productService.findLikedProduct(userId);
    }
    return this.productService.findAll(
      userId,
      type === 'sale',
      categoryId,
      page,
      regionCode
    );
  }

  @Get('')
  findLikedProduct(@Query('value') value: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.findLikedProduct(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return this.productService.update(id, productDto, userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
    return this.productService.updateStatus(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.remove(id, userId);
  }

  @Post(':id/like')
  like(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    if (!userId)
      throw new HttpException(
        `userId 가 없으면 좋아요를 클릭할 수 없습니다.`,
        HttpStatus.METHOD_NOT_ALLOWED
      );
    return this.productService.like(id, userId);
  }
}
