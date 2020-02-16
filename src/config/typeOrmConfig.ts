import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModule = {
  type: 'mongodb',
  url: 'mongodb://localhost/agenda-nest',
  synchronize: true,
  useNewUrlParser: true,
  logging: true,
  entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
  subscribers: [join(__dirname, '../subscribers/*.subscriber{.ts,.js}')],
};
