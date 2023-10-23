import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Version,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JWTGuard } from 'src/auth/guard';
import { LoggingInterceptor, TransformInterceptor } from 'src/interceptor';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseGuards(JWTGuard)
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Version('2')
  @Get('me')
  getMe2(@GetUser() user: User) {
    return user;
  }

  @Get('list')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.usersService.update(+id);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
