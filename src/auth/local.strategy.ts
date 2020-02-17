import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models/user.entity';
import { AuthResponse } from './authResponse';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<AuthResponse> {
    const user: User = await this.usersService.findOne(email);
    const success = await this.authService.validateUser(user, password);
    if (success === false) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
