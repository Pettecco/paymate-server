import { BillingCycleEnum } from 'src/enums/billing-cycle.enum';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Subscription extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: BillingCycleEnum,
    default: BillingCycleEnum.MONTHLY,
  })
  billingCycle: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
