import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModule = {
  type: 'mongodb',
  url: 'mongodb://localhost/agenda-nest',
  synchronize: true,
  useNewUrlParser: true,
  logging: true,
  entities: [join(__dirname, '../models/*.entity{.ts,.js}')],
};
