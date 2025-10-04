import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@common/entities';

@Entity('Users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;
}
