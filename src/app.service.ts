import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class AppService {
  getHello(): string {
    return `Server Active Last Time: ${dayjs().format()}`;
  }
}
