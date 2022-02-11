import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

import { UnitComplianceDim } from './unit-compliance-dim.entity';
import { OwnerYearDim } from './owner-year-dim.entity';

@Entity({ name: 'camddmw.unit_fact' })
export class UnitFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
    transformer: new NumericColumnTransformer(),
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
    transformer: new NumericColumnTransformer(),
  })
  year: number;

  @Column({
    name: 'unitid',
  })
  unitId: string;

  @Column({
    name: 'facility_name',
  })
  facilityName: string;

  @Column({
    name: 'orispl_code',
    transformer: new NumericColumnTransformer(),
  })
  facilityId: number;

  @Column({
    name: 'state',
  })
  stateCode: string;

  @Column({
    name: 'prg_code_info',
  })
  programCodeInfo: string;

  @OneToOne(
    () => UnitComplianceDim,
    ucd => ucd.unitFact,
  )
  unitComplianceDim: UnitComplianceDim;

  @ManyToOne(
    () => OwnerYearDim,
    oyd => oyd.unitFact,
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
  ownerYearDim: OwnerYearDim;
}
