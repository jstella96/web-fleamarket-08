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

  @ApiQuery({ name: 'type', type: String, required: false })
  @Get('')
  findAll(@Query('type') type: string, @Req() request: Request) {
    const userId = request['userId'];
    if (type === 'like') {
      return this.productService.findLikedProduct(userId);
    }
    return this.productService.findAll(userId, type === 'sale');
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

  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.remove(id, userId);
  }

  @Post(':id/like')
  like(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.productService.like(id, userId);
  }
}
