import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './config/typeOrmConfig';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicianModule } from './clinician/clinician.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // configuracion de la base de datos.
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UsersModule,
    ClinicianModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
