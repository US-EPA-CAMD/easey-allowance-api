import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.owner_year_dim' })
export class OwnerYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'own_yr_id',
  })
  ownYearId: number;

  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: string;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @PrimaryColumn({
    name: 'own_type',
  })
  ownType: string;

  @Column({
    name: 'own_id',
  })
  ownId: number;

  @Column({
    name: 'own_display',
  })
  ownerOperator: string;
}
