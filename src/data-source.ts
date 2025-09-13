import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Payment, Subscription, User } from 'src/entities';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Subscription, Payment],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
