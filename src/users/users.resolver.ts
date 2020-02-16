import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
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
    console.log({ email, password, firstName, lastName });
    return this.userService.createAdmin(email, password, firstName, lastName);
  }
}
