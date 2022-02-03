import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { TransactionFact } from './transaction-fact.entity';

@Entity({ name: 'camddmw.transaction_block_dim' })
export class TransactionBlockDim extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_block_id',
    transformer: new NumericColumnTransformer(),
  })
  transactionBlockId: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @Column({
    name: 'transaction_id',
    transformer: new NumericColumnTransformer(),
  })
  transactionId: number;

  @Column({
    name: 'start_block',
    transformer: new NumericColumnTransformer(),
  })
  startBlock: number;

  @Column({
    name: 'end_block',
    transformer: new NumericColumnTransformer(),
  })
  endBlock: number;

  @Column({
    name: 'total_block',
    transformer: new NumericColumnTransformer(),
  })
  totalBlock: number;

  @Column({
    name: 'vintage_year',
    transformer: new NumericColumnTransformer(),
  })
  vintageYear: number;

  @ManyToOne(
    () => TransactionFact,
    tf => tf.transactionBlockDim,
  )
  @JoinColumn([
    {
      name: 'transaction_id',
      referencedColumnName: 'transactionId',
    },
    {
      name: 'prg_code',
      referencedColumnName: 'programCodeInfo',
    },
  ])
  transactionFact: TransactionFact;
}
