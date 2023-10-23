import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RUser } from './types';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RUser[]> {
    try {
      const users = await this.prisma.user.findMany();
      users.forEach(($el) => {
        this.safeUser($el);
      });
      return users;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number): Promise<RUser | { message: any }> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!user) return { message: 'no user found' };
      return this.safeUser(user);
    } catch (error) {
      return { message: error };
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  private safeUser(user: User): RUser {
    delete user.password;
    return user;
  }
}
