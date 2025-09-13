import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 77, nullable: true })
  pixKey?: string;
}
