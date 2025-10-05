import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@common/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Users')
export class User extends BaseEntity {
  @ApiProperty({
    description: 'User full name',
    example: 'João Silva',
    maxLength: 60,
  })
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'joao@example.com',
    format: 'email',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  passwordHash: string;
}
