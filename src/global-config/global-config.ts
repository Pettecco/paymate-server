import { registerAs } from '@nestjs/config';

export default registerAs('globalConfig', () => ({
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: false,
    synchronize: false,
  },
  environment: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 3000,
}));
