import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JWTGuard } from 'src/auth/guard';
import { ProductDto } from './dto';

@UseGuards(JWTGuard)
@Controller({ version: '1', path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }

  @Get('list')
  findAll() {
    return this.productService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }
}
