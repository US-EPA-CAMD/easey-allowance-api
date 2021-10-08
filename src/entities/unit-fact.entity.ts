import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UnitComplianceDim } from './unit-compliance-dim.entity';

@Entity({ name: 'camddmw.unit_fact' })
export class UnitFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
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
  })
  facilityId: number;

  @Column()
  state: string;

  @Column({
    name: 'prg_code_info',
  })
  programCodeInfo: string;

  @OneToOne(
    () => UnitComplianceDim,
    ucd => ucd.unitFact,
  )
  unitComplianceDim: UnitComplianceDim;
}
