import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

import { AccountTypeCode } from './account-type-code.entity';
import { TransactionBlockDim } from './transaction-block-dim.entity';
import { TransactionOwnerDim } from './transaction-owner-dim.entity';
import { TransactionTypeCode } from './transaction-type-code.entity';

@Entity({ name: 'camddmw.transaction_fact' })
export class TransactionFact extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_id',
    transformer: new NumericColumnTransformer(),
  })
  transactionId: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @Column({
    name: 'transaction_total',
    transformer: new NumericColumnTransformer(),
  })
  transactionTotal: number;

  @Column({
    name: 'transaction_type',
  })
  transactionType: string;

  @Column({
    name: 'transaction_type_code',
  })
  transactionTypeCode: string;

  @Column({
    name: 'sell_acct_number',
  })
  sellAccountNumber: string;

  @Column({
    name: 'sell_acct_name',
  })
  sellAccountName: string;

  @Column({
    name: 'sell_account_type',
  })
  sellAccountType: string;

  @Column({
    name: 'sell_account_type_code',
  })
  sellAccountTypeCode: string;

  @Column({
    name: 'sell_facility_name',
  })
  sellFacilityName: string;

  @Column({
    name: 'sell_orispl_code',
    transformer: new NumericColumnTransformer(),
  })
  sellFacilityId: number;

  @Column({
    name: 'sell_state',
  })
  sellState: string;

  @Column({
    name: 'sell_epa_region',
    transformer: new NumericColumnTransformer(),
  })
  sellEpaRegion: number;

  @Column({
    name: 'sell_source_cat',
  })
  sellSourceCategory: string;

  @Column({
    name: 'sell_own_display_name',
  })
  sellOwner: string;

  @Column({
    name: 'buy_acct_number',
  })
  buyAccountNumber: string;

  @Column({
    name: 'buy_acct_name',
  })
  buyAccountName: string;

  @Column({
    name: 'buy_account_type',
  })
  buyAccountType: string;

  @Column({
    name: 'buy_account_type_code',
  })
  buyAccountTypeCode: string;

  @Column({
    name: 'buy_facility_name',
  })
  buyFacilityName: string;

  @Column({
    name: 'buy_orispl_code',
    transformer: new NumericColumnTransformer(),
  })
  buyFacilityId: number;

  @Column({
    name: 'buy_state',
  })
  buyState: string;

  @Column({
    name: 'buy_epa_region',
    transformer: new NumericColumnTransformer(),
  })
  buyEpaRegion: number;

  @Column({
    name: 'buy_source_cat',
  })
  buySourceCategory: string;

  @Column({
    name: 'buy_own_display_name',
  })
  buyOwner: string;

  @Column({
    name: 'transaction_date',
  })
  transactionDate: Date;

  @OneToMany(
    () => TransactionBlockDim,
    tbd => tbd.transactionFact,
  )
  transactionBlockDim: TransactionBlockDim[];

  @ManyToOne(
    () => TransactionOwnerDim,
    tod => tod.transactionFact,
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
  transactionOwnerDim: TransactionOwnerDim;

  @ManyToOne(
    () => AccountTypeCode,
    atd => atd.buyTransactionFact,
  )
  @JoinColumn([
    {
      name: 'buy_account_type_code',
      referencedColumnName: 'accountTypeCode',
    },
  ])
  buyAccountTypeCd: AccountTypeCode;

  @ManyToOne(
    () => AccountTypeCode,
    atd => atd.sellTransactionFact,
  )
  @JoinColumn([
    {
      name: 'sell_account_type_code',
      referencedColumnName: 'accountTypeCode',
    },
  ])
  sellAccountTypeCd: AccountTypeCode;

  @ManyToOne(
    () => TransactionTypeCode,
    ttd => ttd.transactionFact,
  )
  @JoinColumn([
    {
      name: 'transaction_type_code',
      referencedColumnName: 'transactionTypeCode',
    },
  ])
  transactionTypeCd: TransactionTypeCode;
}
