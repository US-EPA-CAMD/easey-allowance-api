import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TransactionBlockDim } from './transaction-block-dim.entity';

@Entity({ name: 'camddmw.transaction_fact' })
export class TransactionFact extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_id',
  })
  transactionId: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  prgCode: string;

  @Column({
    name: 'transaction_total',
  })
  transactionTotal: number;

  @Column({
    name: 'transaction_type',
  })
  transactionType: string;

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
    name: 'sell_facility_name',
  })
  sellFacilityName: string;

  @Column({
    name: 'sell_orispl_code',
  })
  sellOrisplCode: number;

  @Column({
    name: 'sell_state',
  })
  sellState: string;

  @Column({
    name: 'sell_epa_region',
  })
  sellEpaRegion: number;

  @Column({
    name: 'sell_source_cat',
  })
  sellSourceCat: string;

  @Column({
    name: 'sell_own_display_name',
  })
  sellOwnDisplayName: string;

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
    name: 'buy_facility_name',
  })
  buyFacilityName: string;

  @Column({
    name: 'buy_orispl_code',
  })
  buyOrisplCode: number;

  @Column({
    name: 'buy_state',
  })
  buyState: string;

  @Column({
    name: 'buy_epa_region',
  })
  buyEpaRegion: number;

  @Column({
    name: 'buy_source_cat',
  })
  buySourceCat: string;

  @Column({
    name: 'buy_own_display_name',
  })
  buyOwnDisplayName: string;

  @Column({
    name: 'transaction_date',
  })
  transactionDate: Date;

  @OneToMany(
    () => TransactionBlockDim,
    tbd => tbd.transactionFact,
  )
  transactionBlockDim: TransactionBlockDim[];
}
