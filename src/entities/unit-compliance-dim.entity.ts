import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UnitFact } from './unit-fact.entity';
import { OwnerDisplayFact } from './owner-display-fact.entity';

@Entity({ name: 'camddmw.unit_compliance_dim' })
export class UnitComplianceDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  year: number;

  @Column({
    name: 'comp_plan_type_cd',
  })
  complianceApproach: string;

  @Column({
    name: 'avg_plan_id',
  })
  avgPlanId: number;

  @Column({
    name: 'in_compliance',
  })
  inCompliance: string;

  @Column({
    name: 'act_emiss_rate',
  })
  actualEmissionsRate: number;

  @Column({
    name: 'avg_plan_act_emiss_rate',
  })
  avgPlanActual: number;

  @Column({
    name: 'emiss_limit_display',
  })
  emissionsLimitDisplay: number;

  @OneToOne(
    () => UnitFact,
    uf => uf.unitComplianceDim,
  )
  @JoinColumn([
    {
      name: 'unit_id',
      referencedColumnName: 'id',
    },
    {
      name: 'op_year',
      referencedColumnName: 'year',
    },
  ])
  unitFact: UnitFact;

  @OneToOne(
    () => OwnerDisplayFact,
    odf => odf.unitComplianceDim,
  )
  @JoinColumn([
    {
      name: 'unit_id',
      referencedColumnName: 'id',
    },
    {
      name: 'op_year',
      referencedColumnName: 'year',
    },
  ])
  ownerDisplayFact: OwnerDisplayFact;
}
