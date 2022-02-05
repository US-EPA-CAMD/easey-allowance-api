import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

import { AccountFact } from './account-fact.entity';

@Entity({ name: 'camddmw.account_compliance_dim' })
export class AccountComplianceDim extends BaseEntity {
  @PrimaryColumn({
    name: 'account_number',
  })
  accountNumber: string;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCodeInfo: string;

  @PrimaryColumn({
    name: 'op_year',
    transformer: new NumericColumnTransformer(),
  })
  year: number;

  @Column({
    name: 'units_affected',
  })
  unitsAffected: string;

  @Column({
    name: 'allocated',
    transformer: new NumericColumnTransformer(),
  })
  allocated: number;

  @Column({
    name: 'total_held',
    transformer: new NumericColumnTransformer(),
  })
  totalAllowancesHeld: number;

  @Column({
    name: 'banked_held',
    transformer: new NumericColumnTransformer(),
  })
  bankedHeld: number;

  @Column({
    name: 'current_held',
    transformer: new NumericColumnTransformer(),
  })
  currentHeld: number;

  @Column({
    name: 'comp_year_emiss',
    transformer: new NumericColumnTransformer(),
  })
  complianceYearEmissions: number;

  @Column({
    name: 'other_deduct',
    transformer: new NumericColumnTransformer(),
  })
  otherDeductions: number;

  @Column({
    name: 'current_deduct',
    transformer: new NumericColumnTransformer(),
  })
  currentDeductions: number;

  @Column({
    name: 'deduct_1_1',
    transformer: new NumericColumnTransformer(),
  })
  deductOneToOne: number;

  @Column({
    name: 'deduct_2_1',
    transformer: new NumericColumnTransformer(),
  })
  deductTwoToOne: number;

  @Column({
    name: 'total_deduct',
    transformer: new NumericColumnTransformer(),
  })
  totalAllowancesDeducted: number;

  @Column({
    name: 'carried_over',
    transformer: new NumericColumnTransformer(),
  })
  carriedOver: number;

  @Column({
    name: 'excess_emiss',
    transformer: new NumericColumnTransformer(),
  })
  excessEmissions: number;

  @Column({
    name: 'total_req_deduct',
    transformer: new NumericColumnTransformer(),
  })
  totalRequiredDeductions: number;

  @ManyToOne(
    () => AccountFact,
    af => af.accountComplianceDim,
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
