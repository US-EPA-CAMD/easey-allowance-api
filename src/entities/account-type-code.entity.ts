import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AccountFact } from './account-fact.entity';
import { TransactionFact } from './transaction-fact.entity';

@Entity({ name: 'camdmd.account_type_code' })
export class AccountTypeCode extends BaseEntity {
  @PrimaryColumn({
    name: 'account_type_cd',
  })
  accountTypeCode: string;

  @Column({
    name: 'account_type_group_cd',
  })
  accountTypeGroupCode: string;

  @Column({
    name: 'account_type_description',
  })
  accountTypeDescription: string;

  @OneToMany(
    () => AccountFact,
    af => af.accountTypeCd,
  )
  accountFact: AccountFact[];

  @OneToMany(
    () => TransactionFact,
    tf => tf.buyAccountTypeCd,
  )
  buyTransactionFact: TransactionFact[];

  @OneToMany(
    () => TransactionFact,
    tf => tf.sellAccountTypeCd,
  )
  sellTransactionFact: TransactionFact[];
}
