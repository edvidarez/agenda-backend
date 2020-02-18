import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { GqlAuthGuard } from 'src/utils/graqhpqlGuard';
import { CurrentUser } from 'src/utils/userDecorator';
import { User, UserRoleEnum } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { ClinicianDTO } from './clinician.dto';

@Resolver('Clinician')
export class ClinicianResolver {
  constructor(private readonly userService: UsersService) {}
  @Query(() => [{ firstName: String }])
  @UseGuards(GqlAuthGuard)
  async listClinician(@CurrentUser() user: User) {
    user = await this.userService.findOne(user.email);
    if (user.userRole !== UserRoleEnum.ADMIN) {
      throw new UnauthorizedException();
    }
    const cliniciansList = await this.userService.findByRole(
      UserRoleEnum.CLINICIAN,
    );
    return cliniciansList as ClinicianDTO[];
  }
}
