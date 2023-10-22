import { User } from '@prisma/client';

export type RUser = Omit<User, 'password'>;
