import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { AllowanceHoldingDim } from './allowance-holding-dim.entity';
import { AccountComplianceDim } from './account-compliance-dim.entity';
import { AccountOwnerDim } from './account-owner-dim.entity';
import { AccountTypeCode } from './account-type-code.entity';
import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

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
    name: 'unit_id',
  })
  id: string;

  @Column({
    name: 'account_name',
  })
  accountName: string;

  @Column({
    name: 'orispl_code',
    transformer: new NumericColumnTransformer(),
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

  @Column({
    name: 'state',
  })
  stateCode: string;

  @Column({
    name: 'epa_region',
    transformer: new NumericColumnTransformer(),
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

  @Column({
    name: 'account_type_code',
  })
  accountTypeCode: string;

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

  @ManyToOne(
    () => AccountOwnerDim,
    aod => aod.accountFact,
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
  accountOwnerDim: AccountOwnerDim;

  @ManyToOne(
    () => AccountTypeCode,
    atd => atd.accountFact,
  )
  @JoinColumn({
    name: 'account_type_code',
    referencedColumnName: 'accountTypeCode',
  })
  accountTypeCd: AccountTypeCode;
}
