import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/models/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum, UserStateEnum } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';

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
  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
  async createAdmin(
    email: string,
    password: string,
    firstName: string,
    lastName?: string,
  ) {
    const userRole = UserRoleEnum.ADMIN;
    return this.createUser(email, password, userRole, firstName, lastName);
  }
  async createUser(
    email: string,
    password: string,
    userRole: UserRoleEnum,
    firstName: string,
    lastName?: string,
  ) {
    try {
      const hashPassword = await bcrypt.hash(password, 12);
      let userState: UserStateEnum;
      if (userRole === UserRoleEnum.CLINICIAN) {
        userState = UserStateEnum.NOT_VERIFIED;
      } else {
        userState = UserStateEnum.VERIFIED;
      }
      const user = await this.userRepository.insert({
        userRole,
        userState,
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      console.log(user.identifiers[0].id);
      return user.identifiers[0].id;
    } catch (err) {
      // tslint:disable-next-line: no-console
      console.log(err);
    }
    return null;
  }
}
