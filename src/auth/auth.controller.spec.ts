import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { PrismaModule } from '../prisma/prisma.module';

describe('AuthController', () => {
  let controller: AuthController;

  const authDto: AuthDto = {
    email: 'johndoe@gmail.com',
    password: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login', () => {
    it('should error if empty body', async () => {
      const res = await controller.login({} as AuthDto);
      console.log({ res });
    });
    it('should error if wrong email', () => {
      // controller.login();
    });
    it('should error if wrong password', () => {});
    it('should return access token correctly', () => {});
  });

  describe('Register', () => {
    it('should return error empty body', () => {});
    it('should return error if email exist', () => {});
    it('should return access token correctly', () => {});
  });
});
