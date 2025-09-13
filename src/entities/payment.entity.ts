import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';
import { PaymentStatusEnum } from 'src/enums/payment-status.enum';
import { BaseEntity } from './base-entity.entity';

@Entity()
export class Payment extends BaseEntity {
  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  paidAt?: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.PENDING,
  })
  paymentStatus: PaymentStatusEnum;
}
