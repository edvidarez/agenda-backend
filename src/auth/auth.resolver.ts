import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserRoleEnum } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse } from './authResponse';
import { GqlAuthGuard } from 'src/utils/graqhpqlGuard';
import { UseGuards } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly localStrategy: LocalStrategy,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async seguro() {
    return 'seeguroo';
  }

  @Mutation(() => AuthResponse, { nullable: true })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthResponse | null> {
    return await this.localStrategy.validate(email, password);
  }
  @Mutation(() => AuthResponse, { nullable: true })
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args({ name: 'role', type: () => String }) role: string,
    @Args('firstName') firstName: string,
    @Args({ name: 'lastName', nullable: true, type: () => String })
    lastName?: string,
  ): Promise<AuthResponse | null> {
    let userRole = UserRoleEnum.PATIENT;
    if (role.toLocaleLowerCase() === 'clinician') {
      userRole = UserRoleEnum.CLINICIAN;
    }
    return await this.authService.signup(
      email,
      password,
      userRole,
      firstName,
      lastName,
    );
  }
}
