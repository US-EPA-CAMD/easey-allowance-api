import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { TransactionFact } from './transaction-fact.entity';

@Entity({ name: 'camdmd.transaction_type_code' })
export class TransactionTypeCode extends BaseEntity {
  @PrimaryColumn({
    name: 'trans_type_cd',
  })
  transactionTypeCode: string;

  @Column({
    name: 'trans_type_description',
  })
  transactionTypeDescription: string;

  @OneToMany(
    () => TransactionFact,
    tf => tf.transactionTypeCd,
  )
  transactionFact: TransactionFact[];
}
