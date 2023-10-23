import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('signin')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
