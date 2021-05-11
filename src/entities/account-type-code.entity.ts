import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
}
