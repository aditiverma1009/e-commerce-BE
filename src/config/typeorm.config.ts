import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'aditi_verma',
  password: '',
  database: 'demo',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
};
