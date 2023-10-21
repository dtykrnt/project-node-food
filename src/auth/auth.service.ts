import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      return this.signinToken(user.id, user.email);
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

      const passMatches = await argon.verify(user.password, dto.password);

      if (!passMatches) throw new ForbiddenException('Invalid Credential!');

      return this.signinToken(user.id, user.email);
    } catch (error) {
      return error;
    }
  }

  logout() {
    return '';
  }

  private async signinToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
