import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(createAuthDto: CreateAuthDto) {
    return `This action updates a auth`;
  }

  logout() {
    return '';
  }
}
