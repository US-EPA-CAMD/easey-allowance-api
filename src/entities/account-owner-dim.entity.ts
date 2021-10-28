import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { AccountFact } from './account-fact.entity';
import { OneToMany } from 'typeorm';

@Entity({ name: 'camddmw.account_owner_dim' })
export class AccountOwnerDim extends BaseEntity {
  @PrimaryColumn({
    name: 'account_number',
  })
  accountNumber: string;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @PrimaryColumn({
    name: 'account_owner_unique_id',
  })
  accountOwnerUniqueId: number;

  @Column({
    name: 'own_id',
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
    () => AccountFact,
    af => af.accountOwnerDim,
  )
  accountFact: AccountFact[];
}
