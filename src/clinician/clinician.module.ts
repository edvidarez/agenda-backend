import { Module } from '@nestjs/common';
import { ClinicianService } from './clinician.service';
import { ClinicianResolver } from './clinician.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [ClinicianService, ClinicianResolver],
})
export class ClinicianModule {}
