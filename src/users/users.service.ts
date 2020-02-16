import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/models/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async findOneAdmin(): Promise<boolean> {
    const userRole = UserRoleEnum.ADMIN;
    const user = await this.userRepository.findOne({
      where: { userRole },
    });
    return user !== undefined;
  }
  async createAdmin(
    email: string,
    password: string,
    firstName: string,
    lastName?: string,
  ) {
    const userRole = UserRoleEnum.ADMIN;
    try {
      await this.userRepository.insert({
        userRole,
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err) {
      return false;
    }
    return true;
  }
}
