import { BaseEntity, Column, Entity } from 'typeorm';

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
