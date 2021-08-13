import { TransactionFact } from './transaction-fact.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'camddmw.transaction_block_dim' })
export class TransactionBlockDim extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_block_id',
  })
  transactionBlockId: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  prgCode: string;

  @Column({
    name: 'transaction_id',
  })
  transactionId: number;

  @Column({
    name: 'start_block',
  })
  startBlock: number;

  @Column({
    name: 'end_block',
  })
  endBlock: number;

  @Column({
    name: 'total_block',
  })
  totalBlock: number;

  @Column({
    name: 'vintage_year',
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
      referencedColumnName: 'prgCode',
    },
  ])
  transactionFact: TransactionFact;
}
