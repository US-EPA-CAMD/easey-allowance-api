import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TransactionFact } from './transaction-fact.entity';

@Entity({ name: 'camddmw.transaction_owner_dim' })
export class TransactionOwnerDim extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_owner_unique_id',
  })
  transactionOwnerUniqueId: number;

  @Column({
    name: 'transaction_id',
  })
  transactionId: number;

  @Column({
    name: 'prg_code',
  })
  programCodeInfo: number;

  @Column({
    name: 'account_owner_id',
  })
  ownId: number;

  @Column({
    name: 'own_display',
  })
  ownerOperator: string;

  @Column({
    name: 'own_type',
  })
  ownType: string;

  @OneToMany(
    () => TransactionFact,
    tf => tf.transactionOwnerDim,
  )
  transactionFact: TransactionFact[];
}
