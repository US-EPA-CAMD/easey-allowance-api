import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.transaction_owner_dim' })
export class TransactionOwnerDim extends BaseEntity {
  @PrimaryColumn({
    name: 'transaction_owner_unique_id',
  })
  transactionOwnerUniqueId: number;

  @Column({
    name: 'account_owner_id',
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
}
