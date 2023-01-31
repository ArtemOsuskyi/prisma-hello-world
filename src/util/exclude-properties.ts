import { User } from '@prisma/client';

export const exclude = <Key extends keyof User>(user: User, keys: Key[]) => {
  for (const key of keys) {
    delete user[key];
  }
  return user;
};
