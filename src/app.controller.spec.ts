import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import MockDate from 'mockdate';
import dayjs from 'dayjs';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    MockDate.set(Date.now());
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(`should return "Server Active Last Time: ${dayjs().format()}!"`, () => {
      expect(appController.getHello()).toBe(
        `Server Active Last Time: ${dayjs().format()}`,
      );
    });
  });
});
