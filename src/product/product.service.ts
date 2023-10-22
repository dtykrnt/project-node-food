import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ProductDto) {
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

  async findOne(id: number) {
    try {
      const product = this.prisma.product.findFirst({
        where: {
          id: id,
        },
      });
      return product;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, dto: ProductDto) {
    try {
      const product = this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          price: dto.price,
        },
      });
      return product;
    } catch (error) {
      return error;
    }
  }
}
