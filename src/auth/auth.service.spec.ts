import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('SECRET') },
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a user and return a token', async () => {
      const mockPrismaUserCreate = jest
        .fn()
        .mockResolvedValue({ id: 1, email: 'test@test.com' });
      const mockJwtSignAsync = jest.fn().mockResolvedValue('TOKEN');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      jest.spyOn(service, 'signinToken').mockImplementation(mockJwtSignAsync);
      jest
        .spyOn(service['prisma'].user, 'create')
        .mockImplementation(mockPrismaUserCreate);

      const result = await service.register({
        email: 'test@test.com',
        password: 'password',
      });

      expect(mockPrismaUserCreate).toHaveBeenCalled();
      expect(mockJwtSignAsync).toHaveBeenCalled();
      expect(result).toEqual({ access_token: 'TOKEN' });
    });
  });
});
