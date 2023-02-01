import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { excludeProperties } from '../../util/decorators/exclude-properties';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
    return excludeProperties(user, ['password']);
  }

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
    return excludeProperties(user, ['password']);
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto) {
    const user = await this.prismaService.user.update({
      data: {
        ...userUpdateDto,
      },
      where: {
        id,
      },
    });
    return excludeProperties(user, ['password']);
  }

  async deleteUser(id: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
