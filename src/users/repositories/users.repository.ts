import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@common/entities';
import { IUsersRepository } from '../interfaces';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: createUserDto.password, // TODO: Hash password
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }
      throw error;
    }
  }

  async findById(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { id: 'ASC' },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updateData: Partial<User> = {};

    if (updateUserDto.name) updateData.name = updateUserDto.name;
    if (updateUserDto.email) updateData.email = updateUserDto.email;
    if (updateUserDto.password)
      updateData.passwordHash = updateUserDto.password; // TODO: Hash password

    try {
      await this.userRepository.update(id, updateData);
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }
      throw error;
    }
  }

  async delete(userId: string): Promise<boolean> {
    const result = await this.userRepository.delete({ id: userId });
    return result.affected !== undefined && result.affected > 0;
  }
}
