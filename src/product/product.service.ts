import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: dto.name,
          price: dto.price,
        },
      });
      parseInt(dto.price);
      return product;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const products = this.prisma.product.findMany();
      return products;
    } catch (error) {
      return error;
    }
  }
}
