import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';
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
  @Column({
    name: 'account_number',
  })
  accountNumber: string;

  @Column({
    name: 'account_name',
  })
  accountName: string;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @PrimaryColumn({
    name: 'vintage_year',
    transformer: new NumericColumnTransformer(),
  })
  vintageYear: number;

  @Column({
    name: 'total_block',
    transformer: new NumericColumnTransformer(),
  })
  totalBlock: number;

  @PrimaryColumn({
    name: 'start_block',
    transformer: new NumericColumnTransformer(),
  })
  startBlock: number;

  @Column({
    name: 'end_block',
    transformer: new NumericColumnTransformer(),
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
