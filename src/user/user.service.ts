import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserCreateSchema } from '../util/zod-schemas/user-create.schema';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dtos/user-update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  async createUser(userDto: UserCreateDto) {
    const parse = UserCreateSchema.safeParse(userDto);
    if (parse.success === true) {
      const { email, password, firstName, lastName } = userDto;
      const hashedPassword = bcrypt.hashSync(password, 12);
      return await this.userRepository.createUser(
        email,
        hashedPassword,
        firstName,
        lastName,
      );
    } else
      throw new BadRequestException(
        parse.error.issues.map((issue) => issue.message),
      );
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto) {
    return this.userRepository.updateUser(id, userUpdateDto);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}
