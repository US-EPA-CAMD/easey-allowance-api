import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

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
  })
  year: number;

  @Column({
    name: 'units_affected',
  })
  unitsAffected: string;

  @Column({})
  allocated: number;

  @Column({
    name: 'total_held',
  })
  totalAllowancesHeld: number;

  @Column({
    name: 'banked_held',
  })
  bankedHeld: number;

  @Column({
    name: 'current_held',
  })
  currentHeld: number;

  @Column({
    name: 'comp_year_emiss',
  })
  complianceYearEmissions: number;

  @Column({
    name: 'other_deduct',
  })
  otherDeductions: number;

  @Column({
    name: 'current_deduct',
  })
  currentDeductions: number;

  @Column({
    name: 'deduct_1_1',
  })
  deductOneToOne: number;

  @Column({
    name: 'deduct_2_1',
  })
  deductTwoToOne: number;

  @Column({
    name: 'total_deduct',
  })
  totalAllowancesDeducted: number;

  @Column({
    name: 'carried_over',
  })
  carriedOver: number;

  @Column({
    name: 'excess_emiss',
  })
  excessEmissions: number;

  @Column({
    name: 'total_req_deduct',
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
