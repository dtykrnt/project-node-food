import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('list')
  findAll() {
    return this.productService.findAll();
  }
}
