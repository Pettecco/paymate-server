import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './common/entities';

config();

const isCompiledEnvironment = __filename.includes('dist');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: isCompiledEnvironment ? ['dist/common/entities/*.js'] : [User],
  migrations: isCompiledEnvironment
    ? ['dist/migrations/*.js']
    : ['src/migrations/*.ts'],
  synchronize: false,
});
