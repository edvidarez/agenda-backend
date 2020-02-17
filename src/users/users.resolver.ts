import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/utils/graqhpqlGuard';
import { User } from 'src/models/user.entity';
import { CurrentUser } from 'src/utils/userDecorator';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User): Promise<string> {
    const serUser = await await this.userService.findOne(user.email);
    return JSON.stringify(serUser);
  }

  @Query(() => Boolean)
  findOneAdmin() {
    return this.userService.findOneAdmin();
  }
  @Mutation(() => Boolean, { nullable: true })
  async createAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args({ name: 'lastName', nullable: true, type: () => String })
    lastName?: string,
  ) {
    return this.userService.createAdmin(email, password, firstName, lastName);
  }
}
