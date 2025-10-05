import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IUsersRepository } from './interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@common/entities';
import { USERS_REPOSITORY_TOKEN } from './constants/tokens';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async findOneBy(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User not found`);
    }

    try {
      const updatedUser = await this.usersRepository.update(id, updateUserDto);
      return updatedUser!;
    } catch (error) {
      if (error.message === 'EMAIL_ALREADY_EXISTS') {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.usersRepository.delete(id);
  }
}
