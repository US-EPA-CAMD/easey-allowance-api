import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AllowanceHoldingDim } from './allowance-holding-dim.entity';
import { AccountComplianceDim } from './account-compliance-dim.entity';

@Entity({ name: 'camddmw.account_fact' })
export class AccountFact extends BaseEntity {
  @PrimaryColumn({
    name: 'account_number',
  })
  accountNumber: string;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @Column({
    name: 'account_name',
  })
  accountName: string;

  @Column({
    name: 'orispl_code',
  })
  facilityId: number;

  @Column({
    name: 'facility_name',
  })
  facilityName: string;

  @Column({
    name: 'unitid',
  })
  unitId: string;

  @Column()
  state: string;

  @Column({
    name: 'epa_region',
  })
  epaRegion: number;

  @Column({
    name: 'nerc_region',
  })
  nercRegion: string;

  @Column({
    name: 'own_display',
  })
  ownerOperator: string;

  @Column({
    name: 'account_type',
  })
  accountType: string;

  @OneToMany(
    () => AllowanceHoldingDim,
    ahd => ahd.accountFact,
  )
  allowanceHoldingDim: AllowanceHoldingDim[];

  @OneToMany(
    () => AccountComplianceDim,
    acd => acd.accountFact,
  )
  accountComplianceDim: AccountComplianceDim[];
}
