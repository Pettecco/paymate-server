import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@common/entities';
import { UsersRepository } from './repositories';
import { USERS_REPOSITORY_TOKEN } from './constants/tokens';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY_TOKEN,
      useClass: UsersRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService, USERS_REPOSITORY_TOKEN],
})
export class UsersModule {}
