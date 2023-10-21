import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException('Invalid Credential!');
      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  logout() {
    return '';
  }
}
