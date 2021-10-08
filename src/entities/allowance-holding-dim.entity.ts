import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { AccountFact } from './account-fact.entity';

@Entity({ name: 'camddmw.allowance_holding_dim' })
export class AllowanceHoldingDim extends BaseEntity {
  @PrimaryColumn({
    name: 'vintage_year',
  })
  vintageYear: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @PrimaryColumn({
    name: 'start_block',
  })
  startBlock: number;

  @Column({
    name: 'account_number',
  })
  accountNumber: string;

  @Column({
    name: 'account_name',
  })
  accountName: string;

  @Column({
    name: 'total_block',
  })
  totalBlock: number;

  @Column({
    name: 'end_block',
  })
  endBlock: number;

  @ManyToOne(
    () => AccountFact,
    af => af.allowanceHoldingDim,
  )
  @JoinColumn([
    {
      name: 'account_number',
      referencedColumnName: 'accountNumber',
    },
    {
      name: 'prg_code',
      referencedColumnName: 'programCodeInfo',
    },
  ])
  accountFact: AccountFact;
}
