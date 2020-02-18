import { UserStateEnum } from 'src/models/user.entity';

export class ClinicianDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly userState: UserStateEnum;
  readonly signupDate: Date;
}
