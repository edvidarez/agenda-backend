import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserRoleEnum, User } from 'src/models/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './authResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(user: User | null, password: string): Promise<boolean> {
    if (!user) {
      return false;
    }
    const eqPass = await bcrypt.compare(password, user.password);

    console.log('User loged IN', eqPass);
    return eqPass;
  }
  async signup(
    email: string,
    password: string,
    userRole: UserRoleEnum,
    firstName: string,
    lastName?: string,
  ): Promise<AuthResponse | null> {
    const userId = await this.usersService.createUser(
      email,
      password,
      userRole,
      firstName,
      lastName,
    );
    if (userId) {
      const payload = { email };
      const JWT = {
        sessionToken: this.jwtService.sign(payload),
      };
      return JWT;
    }
    return null;
  }
  async login(user: User) {
    const payload = { email: user.email };
    const JWT = {
      sessionToken: this.jwtService.sign(payload),
    };
    console.log('JWT', JWT);
    return JWT;
  }
}
